import "dotenv/config";
import express from "express";
import routers from "./router";

const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "http://localhost";
app.listen(PORT, () => console.log(`App running on ${BASE_URL}:${PORT}`));
