import "@/styles/globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
