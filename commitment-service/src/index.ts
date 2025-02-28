import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";

import commitmentRouter from "./router/commitment.router";
import { authMiddleware } from "./middleware";

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/commitment", authMiddleware, commitmentRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Commitment Service Running!",
  });
});
