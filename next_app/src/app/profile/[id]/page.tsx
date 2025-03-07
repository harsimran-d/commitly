"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { api } from "@/lib/axios";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  bio: string;
  profilePicture?: string;
  publicProfile: boolean;
}

interface Commitment {
  id: string;
  title: string;
}

interface Log {
  id: string;
  description: string;
}

export default function UserProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, commitmentsRes, logsRes] = await Promise.all([
          api.get<User>(`/api/v1/user/${id}`),
          api.get<Commitment[]>(`/api/v1/commitments?userId=${id}`),
          api.get<Log[]>(`/api/v1/logs?userId=${id}`),
        ]);

        setUser(userRes.data);
        setCommitments(commitmentsRes.data);
        setLogs(logsRes.data);
        setIsPrivate(!userRes.data.publicProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">{user?.name}&apos;s Profile</h1>
      </motion.div>

      {loading ? (
        <p>Loading...</p>
      ) : isPrivate && session?.user?.id !== id ? (
        <p>This profile is private.</p>
      ) : (
        <>
          <Card className="mb-4">
            <CardContent>
              <div className="flex items-center gap-4">
                <Image
                  src="/path/to/image.jpg"
                  alt="Description of image"
                  width={500}
                  height={300}
                />
                <div>
                  <h2 className="text-lg font-semibold">{user?.name}</h2>
                  <p className="text-sm text-gray-500">
                    {user?.bio || "No bio available"}
                  </p>
                </div>
              </div>
              {session?.user?.id === id && (
                <Button variant="outline" className="mt-2">
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>

          {session?.user?.id === id && (
            <Card className="mb-4">
              <CardContent>
                <h2 className="text-xl font-semibold">Commitments</h2>
                {commitments.length ? (
                  commitments.map((commitment) => (
                    <p key={commitment.id}>{commitment.title}</p>
                  ))
                ) : (
                  <p>No active commitments</p>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="mb-4">
            <CardContent>
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              {logs.length ? (
                logs.map((log) => <p key={log.id}>{log.description}</p>)
              ) : (
                <p>No recent activity</p>
              )}
            </CardContent>
          </Card>

          {session?.user?.id === id && (
            <Card className="mb-4">
              <CardContent>
                <h2 className="text-xl font-semibold">Profile Privacy</h2>
                <p>
                  {isPrivate
                    ? "Your profile is private"
                    : "Your profile is public"}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsPrivate(!isPrivate)}
                >
                  Toggle Privacy
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
