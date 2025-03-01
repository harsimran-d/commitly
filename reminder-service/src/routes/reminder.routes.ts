import { Router } from "express";
import {
  getReminders,
  createReminder,
  markReminderSent,
} from "../controllers/reminder.controller.ts";

const router = Router();

router.get("/", getReminders);
router.post("/", createReminder);
router.patch("/:id/sent", markReminderSent);

export default router;
