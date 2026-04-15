import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors"
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import configure from "./config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use(passport.initialize())
passport.use(
  new GoogleStrategy({
    clientID: configure.GOOGLE_CLIENT_ID,
    clientSecret: configure.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",

  }, (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
  }),
);

/**
 * @AuthRoutes
 */
app.use("/api/auth", authRoutes);

export default app;
