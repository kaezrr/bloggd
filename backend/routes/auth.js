import { Router } from "express";
import { signUp, logIn, checkUser, whoAmI } from "../controllers/auth.js";

const auth = Router();

auth.post("/login", logIn);
auth.post("/signup", signUp);
auth.get("/me", checkUser, whoAmI);

export default auth;
