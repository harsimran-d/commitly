"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { motion } from "motion/react";
import { api } from "@/lib/axios";

interface Coach {
  name: string;
  bio: string;
}

interface CheckIn {
  id: string;
  date: string;
  feedback?: string;
}

export default function HumanAccountability() {
  const [coach, setCoach] = useState<Coach | null>(null);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [pastCheckIns, setPastCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coachRes, upcomingRes, pastRes] = await Promise.all([
          api.get<Coach>("/api/v1/human-accountability"),
          api.get<CheckIn[]>(
            "/api/v1/human-accountability/check-ins?upcoming=true",
          ),
          api.get<CheckIn[]>(
            "/api/v1/human-accountability/check-ins?history=true",
          ),
        ]);

        setCoach(coachRes.data);
        setCheckIns(upcomingRes.data);
        setPastCheckIns(pastRes.data);
      } catch (error) {
        console.error("Error fetching human accountability data:", error);
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
        <h1 className="text-2xl font-bold">Human Accountability</h1>
      </motion.div>

      <Card className="mb-4">
        <CardContent>
          {loading ? (
            <p>Loading coach details...</p>
          ) : coach ? (
            <div>
              <h2 className="text-lg font-semibold">Coach: {coach.name}</h2>
              <p className="text-sm text-gray-500">{coach.bio}</p>
              <Button variant="outline" size="sm">
                📧 Message Coach
              </Button>
            </div>
          ) : (
            <p>No assigned coach yet</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Upcoming Check-Ins</h2>
          {loading ? (
            <p>Loading...</p>
          ) : checkIns.length ? (
            checkIns.map((checkIn) => (
              <div key={checkIn.id} className="flex justify-between">
                <p>{new Date(checkIn.date).toLocaleString()}</p>
                <Button variant="outline" size="sm">
                  🔄 Reschedule
                </Button>
              </div>
            ))
          ) : (
            <p>No upcoming check-ins</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Check-In History</h2>
          {loading ? (
            <p>Loading...</p>
          ) : pastCheckIns.length ? (
            pastCheckIns.map((checkIn) => (
              <div key={checkIn.id}>
                <p>
                  {new Date(checkIn.date).toLocaleString()} - {checkIn.feedback}
                </p>
              </div>
            ))
          ) : (
            <p>No past check-ins</p>
          )}
        </CardContent>
      </Card>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6"
      >
        <Button className="rounded-full p-4 shadow-lg">
          ➕ Schedule Check-In
        </Button>
      </motion.div>
    </div>
  );
}
