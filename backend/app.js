import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import routes from "./routes/index.js";
import "./controllers/passport.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/auth", routes.auth);
app.use("/posts", routes.post);
app.use("/posts/:postId/comments", routes.comment);

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "http://localhost";
app.listen(PORT, () => console.log(`App running on ${BASE_URL}:${PORT}`));
