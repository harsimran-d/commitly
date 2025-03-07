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

interface Log {
  id: string;
  timestamp: string;
  userEmail: string;
  actionType: string;
  details: string;
}

export default function AuditLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await api.get<Log[]>(
          `/api/v1/audit-logs?limit=50&page=1&actionType=${filter}&search=${search}`,
        );
        setLogs(res.data);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, [filter, search]);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Audit Logs</h1>
      </motion.div>

      <div className="my-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by user/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded border p-2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded border p-2"
        >
          <option value="">All Actions</option>
          <option value="commitment_updated">Commitment Updated</option>
          <option value="reminder_sent">Reminder Sent</option>
          <option value="payment_failed">Payment Failed</option>
        </select>
      </div>

      <Card className="mb-4">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Timestamp</TableHeader>
                <TableHeader>User</TableHeader>
                <TableHeader>Action Type</TableHeader>
                <TableHeader>Details</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              ) : logs.length ? (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>{log.userEmail}</TableCell>
                    <TableCell>{log.actionType}</TableCell>
                    <TableCell>{log.details}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No recent activity found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Button className="mt-4">Export as CSV</Button>
    </div>
  );
}
