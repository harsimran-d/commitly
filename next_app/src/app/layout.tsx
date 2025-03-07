import "@/styles/globals.css";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthProvider } from "@/providers/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
        <GoogleAnalytics gaId="G-5H6XB0CM71" />
      </body>
    </html>
  );
}
