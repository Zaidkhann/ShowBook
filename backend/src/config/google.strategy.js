import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error("Google account does not provide an email"),
            null
          );
        }

        let user = await User.findOne({
          googleId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        user = await User.findOne({
          email: email,
        });

        if (user) {
          user.googleId = profile.id;

          if (!user.image && profile.photos?.[0]?.value) {
            user.image = profile.photos[0].value;
          }

          await user.save();

          return done(null, user);
        }

        user = await User.create({
          username: profile.displayName || email.split("@")[0],
          email: email,
          image: profile.photos?.[0]?.value || "",
          googleId: profile.id,
          location: "",
          role: "user",
        });

        return done(null, user);
      } catch (error) {
        console.error("Google authentication error:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;