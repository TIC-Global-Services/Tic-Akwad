
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/Wrapper/LenisScroll";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Navigation/Footer";
import FooterVisibility from "@/components/Reusbale/FooterVisibility";
import FPSMeter from "@/components/Reusbale/FPSMeter";

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TIC | Akwad",
  description: "The Internet Company",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <LenisProvider>
          <Navbar />
          <FPSMeter />
          {children}
          <FooterVisibility>
            <Footer />
          </FooterVisibility>
          </LenisProvider>
      </body>
    </html> 
  );
}
