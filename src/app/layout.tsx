import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RM Character Explorer",
  description: "Rick and Morty Character Explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        {children}
      </body>
    </html>
  );
}
