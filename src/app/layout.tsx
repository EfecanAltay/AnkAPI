import { ThemeContext } from "@emotion/react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ankapi",
  description: "Req a API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: "100%", width: "100%" }}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body style={{ height: "100%", width: "100%" }}>{children}</body>
    </html>
  );
}
