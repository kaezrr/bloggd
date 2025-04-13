import { Router } from "express";

const auth = Router();

auth.post("/login");
auth.post("/logout");
auth.post("/me");

export default auth;
