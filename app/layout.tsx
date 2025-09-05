import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"  
import Footer from './components/Footer';
import {TranslateProvider} from "./hooks/useTranslate"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "EnergyFlow",
  description: "EnergyFlow is best",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} antialiased bg-gray-50`}
      >
                <TranslateProvider>

        <Header />
        {children}
                <Footer />
        </TranslateProvider>

      </body>
    </html>
  )
}
