import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./ui/fonts";
import { Providers } from "@/redux/storeRedux/provider";



export const metadata: Metadata = {
  title: "Christian Gonzalez Portfolio",
  description: "Portoflio de Christian Gonzalez",
  icons: "/img/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </Providers>
  );
}
