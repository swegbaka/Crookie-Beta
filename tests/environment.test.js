const test = require("node:test");
const assert = require("node:assert/strict");
const { loadConfig, loadEmailConfig } = require("../config/environment");

const valid = {
  DATABASE: "mongodb://127.0.0.1:27017/Recipe",
  JWT_SECRET: "test-only-secret-with-at-least-32-characters",
};

test("local setup works without optional SMTP credentials", () => {
  const config = loadConfig(valid);
  assert.equal(config.port, 3000);
  assert.equal(config.database, valid.DATABASE);
  assert.equal(config.jwtExpiresIn, "1d");
  assert.equal(config.nodeEnv, "development");
  assert.equal(loadConfig({ ...valid, PORT: "4000" }).port, 4000);
});

test("Atlas passwords with reserved characters are escaped once", () => {
  const config = loadConfig({
    ...valid,
    DATABASE: "mongodb+srv://cook:<password>@example.mongodb.net/Recipe",
    DATABASE_PASSWORD: "a#b@c:d/e%f",
  });
  assert.equal(config.database,
    "mongodb+srv://cook:a%23b%40c%3Ad%2Fe%25f@example.mongodb.net/Recipe");
  assert.throws(() => loadConfig({
    ...valid, DATABASE: "mongodb+srv://cook:<password>@example.mongodb.net/Recipe",
  }), /DATABASE_PASSWORD/);
});

test("bad configuration fails without revealing supplied values", () => {
  for (const override of [
    { DATABASE: "" }, { DATABASE: "https://private-host.invalid" },
    { JWT_SECRET: "" }, { JWT_SECRET: "private-short-secret" },
    { PORT: "0" }, { PORT: "65536" }, { PORT: "3.5" },
    { NODE_ENV: "prod" }, { JWT_EXPIRES_IN: "1000" },
    { JWT_COOKIE_EXPIRES_IN: "-1" },
  ]) {
    assert.throws(() => loadConfig({ ...valid, ...override }), (error) => {
      assert.equal(error.name, "ConfigurationError");
      assert.ok(!error.message.includes("private-short-secret"));
      assert.ok(!error.message.includes("private-host.invalid"));
      return true;
    });
  }
});

test("SMTP supports a local capture server and authenticated TLS", () => {
  const local = loadEmailConfig({ EMAIL_HOST: "localhost", EMAIL_FROM: "cook@example.test", EMAIL_PORT: "1025" });
  assert.equal(local.port, 1025);
  assert.equal(local.secure, false);
  assert.equal(local.auth, undefined);
  const tls = loadEmailConfig({ EMAIL_HOST: "smtp.example.test", EMAIL_FROM: "cook@example.test", EMAIL_PORT: "465", EMAIL_USERNAME: "cook", EMAIL_PASSWORD: "secret" });
  assert.equal(tls.secure, true);
  assert.deepEqual(tls.auth, { user: "cook", pass: "secret" });
  assert.throws(() => loadEmailConfig({}), /EMAIL_HOST and EMAIL_FROM/);
  assert.throws(() => loadEmailConfig({ EMAIL_HOST: "localhost", EMAIL_FROM: "cook@example.test", EMAIL_USERNAME: "cook" }), /both EMAIL_USERNAME and EMAIL_PASSWORD/);
});
