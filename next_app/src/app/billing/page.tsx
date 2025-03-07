"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { api } from "@/lib/axios";

interface Subscription {
  plan: string;
  renewalDate: string;
  status: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: string;
}

export default function Billing() {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [subRes, plansRes, transactionsRes] = await Promise.all([
          api.get<Subscription>("/api/v1/subscription"),
          api.get<Plan[]>("/api/v1/plans"),
          api.get<Transaction[]>(
            `/api/v1/payment-transactions?userId=${session?.user?.id}`,
          ),
        ]);

        setSubscription(subRes.data);
        setPlans(plansRes.data);
        setTransactions(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      } finally {
        setLoading(false);
      }
    }
    if (session) fetchData();
  }, [session]);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Subscription & Billing</h1>
      </motion.div>

      <Card className="mb-4">
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : subscription ? (
            <div>
              <h2 className="text-lg font-semibold">
                Current Plan: {subscription.plan}
              </h2>
              <p className="text-sm text-gray-500">
                Renewal Date:{" "}
                {new Date(subscription.renewalDate).toLocaleDateString()}
              </p>
              {subscription.status === "active" ? (
                <Button variant="outline" size="sm">
                  Cancel Subscription
                </Button>
              ) : (
                <Button variant="default" size="sm">
                  Upgrade Plan
                </Button>
              )}
            </div>
          ) : (
            <p>No active subscription</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Available Plans</h2>
          {loading ? (
            <p>Loading...</p>
          ) : plans.length ? (
            plans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between">
                <p>
                  {plan.name} - ${plan.price}/month
                </p>
                <Button variant="outline" size="sm">
                  Select Plan
                </Button>
              </div>
            ))
          ) : (
            <p>No plans available</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Payment History</h2>
          {loading ? (
            <p>Loading...</p>
          ) : transactions.length ? (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between">
                <p>
                  {new Date(transaction.date).toLocaleDateString()} - $
                  {transaction.amount}
                </p>
                <p
                  className={
                    transaction.status === "failed"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {transaction.status}
                </p>
                {transaction.status === "failed" && (
                  <Button variant="destructive" size="sm">
                    Retry Payment
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p>No transactions found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
