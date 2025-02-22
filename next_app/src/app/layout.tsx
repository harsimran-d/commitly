import "@/styles/globals.css";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
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
        <GoogleAnalytics gaId="G-5H6XB0CM71" />
      </body>
    </html>
  );
}
