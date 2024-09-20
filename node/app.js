#!/usr/bin/env nod
import createError from "http-errors";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import authentication from "./routes/authentication.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// var createError = require('http-errors');

// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const authenticate = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Fetch user data from the database using the session ID
  // ...

  // If user is authenticated, attach user data to the request object
  req.user = {
    /* ... user data */
  };
  next();
};

// Apply the middleware to protected routes
app.use("/protected-routes", authenticate, (req, res) => {
  // Access user data using req.user
  res.json({ message: "You are authenticated!" });
});

app.get("/logout", (req, res) => {
  res.clearCookie("sessionId");
  res.redirect("/login");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", authentication);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(5432, () => {
  console.log("Listening...");
});

export default app;
