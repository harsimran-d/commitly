"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { motion } from "motion/react";
import { api } from "@/lib/axios";

interface Notification {
  id: string;
  message: string;
}

interface MissedTask {
  id: string;
  commitmentTitle: string;
  dueDate: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [missedTasks, setMissedTasks] = useState<MissedTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [notiRes, missedRes] = await Promise.all([
          api.get<Notification[]>("/api/v1/notifications"),
          api.get<MissedTask[]>("/api/v1/reminders/missed"),
        ]);

        setNotifications(notiRes.data);
        setMissedTasks(missedRes.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
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
        <h1 className="text-2xl font-bold">Notifications & Alerts</h1>
      </motion.div>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Unread Notifications</h2>
          {loading ? (
            <p>Loading...</p>
          ) : notifications.length ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between"
              >
                <p>{notification.message}</p>
                <Button variant="outline" size="sm">
                  Mark as Read
                </Button>
              </div>
            ))
          ) : (
            <p>All caught up! No new alerts.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Missed Tasks</h2>
          {loading ? (
            <p>Loading...</p>
          ) : missedTasks.length ? (
            missedTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <p>
                  {task.commitmentTitle} - Missed on{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button variant="default" size="sm">
                    ✅ Mark as Completed
                  </Button>
                  <Button variant="outline" size="sm">
                    🔄 Reschedule
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>No missed tasks found.</p>
          )}
        </CardContent>
      </Card>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6"
      >
        <Button className="rounded-full p-4 shadow-lg">
          ⚙ Adjust Notification Settings
        </Button>
      </motion.div>
    </div>
  );
}
