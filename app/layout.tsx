import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Locator — Manage your Vehicles & Team",
  description:
    "Premium UAE fleet management & GPS telematics. Real-time tracking, driver behaviour AI, video telematics and compliance-grade reports.",
  metadataBase: new URL("https://locator.example.com"),
  openGraph: {
    title: "Locator — Manage your Vehicles & Team",
    description: "Premium UAE fleet management & GPS telematics.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
