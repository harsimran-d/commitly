"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { motion } from "motion/react";
import { api } from "@/lib/axios";

interface User {
  name: string;
  email: string;
}

interface Subscription {
  plan: string;
  renewalDate: string;
}

interface ReminderSettings {
  frequency: string;
}

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [reminderSettings, setReminderSettings] =
    useState<ReminderSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, subRes, reminderRes] = await Promise.all([
          api.get<User>("/api/v1/user"),
          api.get<Subscription>("/api/v1/subscription"),
          api.get<ReminderSettings>("/api/v1/reminders/settings"),
        ]);

        setUser(userRes.data);
        setSubscription(subRes.data);
        setReminderSettings(reminderRes.data);
      } catch (error) {
        console.error("Error fetching settings data:", error);
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
        <h1 className="text-2xl font-bold">Settings</h1>
      </motion.div>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Profile Information</h2>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="space-y-3">
              <Input
                type="text"
                value={user.name}
                placeholder="Name"
                className="rounded border p-2"
              />
              <Input
                type="email"
                value={user.email}
                readOnly
                className="rounded border bg-gray-100 p-2"
              />
              <Button variant="outline">Save Changes</Button>
            </div>
          ) : (
            <p>Unable to fetch user data.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Security Settings</h2>
          <Input
            type="password"
            placeholder="Current Password"
            className="rounded border p-2"
          />
          <Input
            type="password"
            placeholder="New Password"
            className="rounded border p-2"
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            className="rounded border p-2"
          />
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
          {loading ? (
            <p>Loading...</p>
          ) : reminderSettings ? (
            <div className="space-y-3">
              <select
                className="rounded border p-2"
                value={reminderSettings.frequency}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom</option>
              </select>
              <Button variant="outline">Save Preferences</Button>
            </div>
          ) : (
            <p>Unable to fetch settings.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Subscription & Billing</h2>
          {loading ? (
            <p>Loading...</p>
          ) : subscription ? (
            <div>
              <p>Plan: {subscription.plan}</p>
              <p>
                Renewal Date:{" "}
                {new Date(subscription.renewalDate).toLocaleDateString()}
              </p>
              <Button variant="outline">Manage Subscription</Button>
            </div>
          ) : (
            <p>No active subscription</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold text-red-500">
            Account Management
          </h2>
          <Button variant="destructive">Delete My Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
