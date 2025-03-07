"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

import { motion } from "motion/react";
import { api } from "@/lib/axios";

interface Overview {
  totalUsers: number;
  activeSubscriptions: number;
  totalCommitments: number;
  missedReminders: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
}

interface Log {
  id: string;
  message: string;
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [overviewRes, usersRes, logsRes] = await Promise.all([
          api.get<Overview>("/api/v1/admin/overview"),
          api.get<User[]>("/api/v1/admin/users?role=user"),
          api.get<Log[]>("/api/v1/admin/audit-logs?limit=20"),
        ]);

        setOverview(overviewRes.data);
        setUsers(usersRes.data);
        setLogs(logsRes.data);
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
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
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </motion.div>

      <Card className="mb-4">
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : overview ? (
            <div className="grid grid-cols-2 gap-4">
              <p>Total Users: {overview.totalUsers}</p>
              <p>Active Subscriptions: {overview.activeSubscriptions}</p>
              <p>Total Commitments: {overview.totalCommitments}</p>
              <p>Missed Reminders: {overview.missedReminders}</p>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">User Management</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              ) : users.length ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        🔄 Change Role
                      </Button>
                      <Button variant="destructive" size="sm">
                        🚫 Ban
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No users found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Recent System Logs</h2>
          {loading ? (
            <p>Loading...</p>
          ) : logs.length ? (
            logs.map((log) => <p key={log.id}>{log.message}</p>)
          ) : (
            <p>No logs found.</p>
          )}
        </CardContent>
      </Card>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6"
      >
        <Button className="rounded-full p-4 shadow-lg">
          📢 Send Announcement
        </Button>
      </motion.div>
    </div>
  );
}
