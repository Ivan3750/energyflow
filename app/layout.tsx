import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { TranslateProvider } from "./hooks/useTranslate";
import ClientWrapper from "./components/ClientWrapper";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "EnergyFlow",
  description: "EnergyFlow is best",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased bg-white`}>
      <TranslateProvider>
  <Header />
  <ClientWrapper>{children}</ClientWrapper>
  <Footer />
</TranslateProvider>

      </body>
    </html>
  );
}
