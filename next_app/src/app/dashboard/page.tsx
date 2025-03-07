"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
// import { api } from "@/lib/axios";

interface Commitment {
  id: string;
  title: string;
}

interface Reminder {
  id: string;
  title: string;
}

interface Log {
  id: string;
  description: string;
}

interface Subscription {
  plan: string;
}

export default function Dashboard() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [recentLogs, setRecentLogs] = useState<Log[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // const [commitmentsRes, remindersRes, logsRes, subscriptionRes] =
        //   await Promise.all([
        //     api.get<Commitment[]>("/api/v1/commitment?status=active&limit=5"),
        //     api.get<Reminder[]>("/api/v1/reminder?upcoming=true&limit=5"),
        //     api.get<Log[]>("/api/v1/logs?recent=true&limit=5"),
        //     api.get<Subscription>("/api/v1/subscription"),
        //   ]);

        //   setCommitments(commitmentsRes.data);
        //   setReminders(remindersRes.data);
        //   setRecentLogs(logsRes.data);
        //   setSubscription(subscriptionRes.data);
        setCommitments([{ id: "2", title: "First commitment" }]);
        setReminders([]);
        setRecentLogs([]);
        setSubscription({ plan: "free" });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
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
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Welcome back</h1>
        {subscription?.plan === "free" && (
          <p className="text-sm text-gray-500">
            Free Plan -{" "}
            <a href="/billing" className="text-blue-500">
              Upgrade to Premium
            </a>
          </p>
        )}
      </motion.div>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Active Commitments</h2>
          {loading ? (
            <p>Loading...</p>
          ) : commitments.length ? (
            commitments.map((commitment) => (
              <p key={commitment.id}>{commitment.title}</p>
            ))
          ) : (
            <p>No active commitments</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Upcoming Reminders</h2>
          {loading ? (
            <p>Loading...</p>
          ) : reminders.length ? (
            reminders.map((reminder) => (
              <div key={reminder.id} className="flex justify-between">
                <p>{reminder.title}</p>
                <Button variant="outline" size="sm">
                  Snooze
                </Button>
              </div>
            ))
          ) : (
            <p>All caught up! No pending reminders</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          {loading ? (
            <p>Loading...</p>
          ) : recentLogs.length ? (
            recentLogs.map((log) => <p key={log.id}>{log.description}</p>)
          ) : (
            <p>No recent activity</p>
          )}
        </CardContent>
      </Card>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6"
      >
        <Button className="rounded-full p-4 shadow-lg">
          ➕ Add Commitment
        </Button>
      </motion.div>
    </div>
  );
}
