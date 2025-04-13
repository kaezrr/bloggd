import "dotenv/config";
import express from "express";
import routes from "./routes";

const app = express();

app.use("/posts", routes.post);
app.use("/posts/:postId/comments", routes.comment);

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "http://localhost";
app.listen(PORT, () => console.log(`App running on ${BASE_URL}:${PORT}`));
