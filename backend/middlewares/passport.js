import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/users.js";
import jwt from "jsonwebtoken";

// 🔑 Use ENV values (move secrets to .env)
const JWT_SECRET = process.env.JWT_SECRET || "11235";

// ---------------- Local Strategy ----------------
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // use email instead of username
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "Email not found" });

        // ⚠️ You currently use plain text passwords.
        // Replace this with bcrypt.compare in production.
        if (user.password !== password) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ---------------- JWT Strategy ----------------
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer <token>
        (req) => req.cookies?.accessToken,        // or from cookie
      ]),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select("-password -refreshToken");
        if (!user) return done(null, false);

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
