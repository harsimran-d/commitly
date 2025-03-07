"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { motion } from "motion/react";
import { api } from "@/lib/axios";

interface Profile {
  id: string;
  name: string;
  bio: string;
}

interface Commitment {
  id: string;
  title: string;
}

interface Group {
  id: string;
  name: string;
  isPrivate: boolean;
}

export default function SearchExplore() {
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profilesRes, commitmentsRes, groupsRes] = await Promise.all([
          api.get<Profile[]>(`/api/v1/users?public=true&search=${search}`),
          api.get<Commitment[]>("/api/v1/commitment/popular"),
          api.get<Group[]>(`/api/v1/groups?search=${search}`),
        ]);

        setProfiles(profilesRes.data);
        setCommitments(commitmentsRes.data);
        setGroups(groupsRes.data);
      } catch (error) {
        console.error("Error fetching search data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [search]);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Search & Explore</h1>
      </motion.div>

      <div className="my-4">
        <Input
          type="text"
          placeholder="Search for users or groups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Featured Public Profiles</h2>
          {loading ? (
            <p>Loading...</p>
          ) : profiles.length ? (
            profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{profile.name}</p>
                  <p className="text-sm text-gray-500">{profile.bio}</p>
                </div>
                <Button variant="outline">View Profile</Button>
              </div>
            ))
          ) : (
            <p>No public profiles found.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">Trending Commitments</h2>
          {loading ? (
            <p>Loading...</p>
          ) : commitments.length ? (
            commitments.map((commitment) => (
              <div
                key={commitment.id}
                className="flex items-center justify-between"
              >
                <p>{commitment.title}</p>
                <Button variant="outline">Join</Button>
              </div>
            ))
          ) : (
            <p>No trending commitments found.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold">
            Public Accountability Groups
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : groups.length ? (
            groups.map((group) => (
              <div key={group.id} className="flex items-center justify-between">
                <p>{group.name}</p>
                {group.isPrivate ? (
                  <Button variant="outline">Request to Join</Button>
                ) : (
                  <Button variant="default">Join Group</Button>
                )}
              </div>
            ))
          ) : (
            <p>No groups found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
