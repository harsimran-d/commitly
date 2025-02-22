"use client";

import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
