import jwt from "jsonwebtoken";
import "dotenv/config";
import db from "../prisma/prisma";
import bcrypt from "bcryptjs";
import passport from "passport";

export async function logIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3h" },
    );
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function signUp(req, res) {
  try {
    const { email, password } = req.body;
    await db.user.create({
      data: { email, password: await bcrypt.hash(password, 10) },
    });
    return res.json("User successfully created!");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export function whoAmI(req, res) {
  return res.json(req.user);
}

export const checkUser = passport.authenticate("jwt", { session: false });
