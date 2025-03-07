"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { motion } from "motion/react";
import { api } from "@/lib/axios";

interface Commitment {
  id: string;
  title: string;
  description: string;
}

export default function MyCommitments() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get<Commitment[]>(
          `/api/v1/commitment?status=${filter}`,
        );
        setCommitments(res.data);
      } catch (error) {
        console.error("Error fetching commitments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter]);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">My Commitments</h1>
      </motion.div>

      <div className="my-4 flex gap-2">
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={filter === "missed" ? "default" : "outline"}
          onClick={() => setFilter("missed")}
        >
          Missed
        </Button>
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : commitments.length ? (
          commitments.map((commitment) => (
            <Card key={commitment.id} className="mb-4">
              <CardContent className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{commitment.title}</h2>
                  <p className="text-sm text-gray-500">
                    {commitment.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="default" size="sm">
                    ✔️ Complete
                  </Button>
                  <Button variant="outline" size="sm">
                    ✏️ Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    🗑 Delete
                  </Button>
                  <Button variant="outline" size="sm">
                    📅 Reschedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No commitments found</p>
        )}
      </div>

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
