import type { Metadata } from "next";
import StoreProvider from "@/providers/StoreProvider";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ShopSphere | Online Store",
  description: "Discover products and shop online."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div className="p-4">Loading store...</div>}>
          <StoreProvider>{children}</StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}