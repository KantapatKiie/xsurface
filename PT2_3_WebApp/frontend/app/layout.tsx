import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotificationSystem from "@/components/NotificationSystem";
import StyledComponentsRegistry from "./registry";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XSURFACE - Product Catalog",
  description: "XSF FullStack Developer Test - Product Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <NotificationSystem />
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
