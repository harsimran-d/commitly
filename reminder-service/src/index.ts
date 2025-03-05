import express from "express";
import cors from "cors";
import reminderRoutes from "./routes/reminder.routes.ts";
import { authMiddleware } from "./middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/reminders", authMiddleware, reminderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Reminder Service Running!" });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`✅ Reminder Service running on port ${PORT}`);
});
