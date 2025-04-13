import "dotenv/config";
import jwt from "jsonwebtoken";
import db from "../prisma/prisma.js";
import bcrypt from "bcryptjs";
import passport from "./passport.js";

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      },
    );

    return res.json({
      message: "Token created successfully",
      data: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export async function signUp(req, res) {
  try {
    const { email, name, password } = req.body;
    const user = await db.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
      },
    });

    return res.json({
      message: "User successfully created!",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

export function whoAmI(req, res) {
  const { id, name, email } = req.user;
  return res.json({ id, name, email });
}

export const checkUser = passport.authenticate("jwt", { session: false });
