"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { motion } from "motion/react";
import { api } from "@/lib/axios";

interface Reminder {
  id: string;
  commitmentTitle: string;
  time: string;
}

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get<Reminder[]>(
          "/api/v1/reminders?upcoming=true",
        );
        setReminders(res.data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Reminders</h1>
      </motion.div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : reminders.length ? (
          reminders.map((reminder) => (
            <Card key={reminder.id} className="mb-4">
              <CardContent className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {reminder.commitmentTitle}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(reminder.time).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    ⏳ Snooze
                  </Button>
                  <Button variant="outline" size="sm">
                    📅 Reschedule
                  </Button>
                  <Button variant="destructive" size="sm">
                    🚫 Disable
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No upcoming reminders</p>
        )}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6"
      >
        <Button className="rounded-full p-4 shadow-lg">➕ Add Reminder</Button>
      </motion.div>
    </div>
  );
}
