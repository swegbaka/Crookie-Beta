const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

process.env.NODE_ENV = "test";
process.env.DATABASE = "mongodb://127.0.0.1:27017/Recipe";
process.env.JWT_SECRET = "test-only-secret-with-at-least-32-characters";
process.env.JWT_EXPIRES_IN = "1d";
process.env.JWT_COOKIE_EXPIRES_IN = "1";
process.env.PORT = "3000";

const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const { startServer } = require("../node");

test("app loads its routes and renders a page without connecting to MongoDB", async () => {
  assert.equal(mongoose.connection.readyState, 0);
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    const response = await fetch(`${base}/about`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /<title>About<\/title>/);
    const missing = await fetch(`${base}/missing-page`);
    assert.equal(missing.status, 404);
    const login = await fetch(`${base}/api/user/login`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: "{}",
    });
    assert.equal(login.status, 400);
    assert.match((await login.json()).message, /Provide email and password/);

    const originalCreate = User.create;
    User.create = async () => ({ _id: "test-user", name: "Cook", password: "never-return-this" });
    try {
      const signup = await fetch(`${base}/api/user/signup`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Cook", email: "cook@example.test" }),
      });
      assert.equal(signup.status, 201);
      const cookie = signup.headers.get("set-cookie");
      assert.match(cookie, /HttpOnly/);
      assert.match(cookie, /SameSite=Lax/);
      assert.ok(!cookie.includes("Secure"));
      assert.equal((await signup.json()).data.user.password, undefined);
    } finally {
      User.create = originalCreate;
    }
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("database failure prevents the server from listening", async () => {
  const originalConnect = mongoose.connect;
  const originalListen = app.listen;
  let listened = false;
  mongoose.connect = async () => { throw new Error("simulated database failure"); };
  app.listen = () => { listened = true; };
  try {
    await assert.rejects(startServer(), /simulated database failure/);
    assert.equal(listened, false);
  } finally {
    mongoose.connect = originalConnect;
    app.listen = originalListen;
  }
});

test("missing configuration exits promptly with an actionable error", () => {
  const result = spawnSync(process.execPath, [path.join(__dirname, "../node.js")], {
    env: { ...process.env, DATABASE: "" }, encoding: "utf8", timeout: 10000,
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Configuration error: DATABASE/);
  assert.ok(!result.stderr.includes(process.env.JWT_SECRET));
});
