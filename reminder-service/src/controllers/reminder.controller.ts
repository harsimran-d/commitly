import { prisma } from "main-db";
import { Request, Response } from "express";
import { z } from "zod";

import { createClient } from "redis";
const redis = createClient();
redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect();

const reminderSchema = z.object({
  commitmentId: z.string(),
  scheduledAt: z.string(),
  contactMethod: z.enum(["EMAIL", "SMS", "CALL"]),
});

export const getReminders = async (req: Request, res: Response) => {
  try {
    const reminders = await prisma.reminder.findMany();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};

export const createReminder = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const validatedData = reminderSchema.parse(req.body);

    const newReminder = await prisma.reminder.create({
      data: { ...validatedData, userId },
    });

    await redis.xAdd("email_reminder_notifications", "*", {
      reminderId: newReminder.id,
      scheduledAt: validatedData.scheduledAt,
      contactMethod: validatedData.contactMethod,
    });

    res.status(201).json(newReminder);
  } catch (error) {
    const message = (error as any)?.message || "Failed to create reminder";
    res.status(400).json({ error: message });
  }
};

export const markReminderSent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.reminder.update({
      where: { id },
      data: { status: "SENT", sentAt: new Date() },
    });

    res.json({ message: "Reminder marked as sent" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update reminder status" });
  }
};
