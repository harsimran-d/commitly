"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { motion } from "motion/react";

import { Line } from "react-chartjs-2";
import { api } from "@/lib/axios";

interface Stats {
  totalCommitments: number;
  completionRate: number;
  missedTasks: number;
  currentStreak: number;
}

interface Progress {
  date: string;
  completed: number;
  missed: number;
}

interface Log {
  id: string;
  message: string;
}

export default function CommitmentAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, progressRes, logsRes] = await Promise.all([
          api.get<Stats>("/api/v1/commitment/stats"),
          api.get<Progress[]>("/api/v1/commitment/commitment-periods/progress"),
          api.get<Log[]>("/api/v1/commitment/logs?timeRange=30d"),
        ]);

        setStats(statsRes.data);
        setProgress(progressRes.data);
        setLogs(logsRes.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const data = {
    labels: progress.map((p) => new Date(p.date).toLocaleDateString()),
    datasets: [
      {
        label: "Completed",
        data: progress.map((p) => p.completed),
        borderColor: "green",
        fill: false,
      },
      {
        label: "Missed",
        data: progress.map((p) => p.missed),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Commitment Analytics</h1>
      </motion.div>

      <Card className="mb-4">
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : stats ? (
            <div className="grid grid-cols-2 gap-4">
              <p>Total Commitments: {stats.totalCommitments}</p>
              <p>Completion Rate: {stats.completionRate}%</p>
              <p>Missed Tasks: {stats.missedTasks}</p>
              <p>Current Streak: {stats.currentStreak}</p>
            </div>
          ) : (
            <p>No analytics data available</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Commitment Breakdown</h2>
          {loading ? <p>Loading...</p> : <Line data={data} />}
        </CardContent>
      </Card>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6"
      >
        <Button className="rounded-full p-4 shadow-lg">
          📅 Modify Commitment Frequency
        </Button>
      </motion.div>
    </div>
  );
}
