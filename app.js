const path = require("path");
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const AppError = require("./Error");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieparser = require("cookie-parser");

// Server-rendered pages.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Public assets
app.use(express.static(path.join(__dirname, "test")));

app.use(
  helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
);

//import from beefRouter.js
const beefRouter = require("./routes/foodRouter");

const userRouter = require("./routes/userRouter");
const crookieRouter = require("./routes/crookieRoute");

app.use(morgan("dev"));

//global middlewares
const limiter = rateLimit({
  max: 100,
  windowMs: 3600000, // allow 100 requesst from the same IP address in one hour
  message: "Too many requests, please try again later",
});
app.use("/api", limiter);

// Parse request bodies before the sanitization middleware.
app.use(express.json({ limit: "10kb" }));
app.use(cookieparser());

//data sanitization against NoSQL attack  --------aka login wo email, only knowing password
app.use(mongoSanitize());

//against xss attack
app.use(xss());

// ROUTES
app.use("/", crookieRouter);
//Get all data from database
app.use("/api/beef", beefRouter);
//Get all user data from database
app.use("/api/user", userRouter);

//unknown Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//globlal error
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
