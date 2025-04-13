import "dotenv/config";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import db from "../prisma/prisma.js";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await db.user.findUnique({ where: { id: payload.id } });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport;
