require("dotenv").config();
require("./config/db");

const express = require("express");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");

const indexRouter = require("./routes")

const app = express();


app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  name: "session-id",
  cookie: { httpOnly: true },
}));
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy({
  usernameField: "email",
},
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        done(null, false, { message: "잘못된 아이디 입니다." });
        return;
      }

      const passwordVerification = await bcrypt.compare(password, user.password);

      if (!passwordVerification) {
        done(null, false, { message: "잘못된 비밀번호 입니다." });
        return;
      }

      done(null, user);
      return;
    } catch (error) {
      done(error);
      return;
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (userId, done) {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (error, req, res, next) {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.render("error");
});

module.exports = app;
