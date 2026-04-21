import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NACIONALE | Premium Serbian Clothing",
  description: "Ultra-modern 3D animated web shop for premium Serbian brand NACIONALE. Quality, tradition, and immersive presentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased bg-background text-text-primary overflow-x-hidden selection:bg-primary/30">
        <SmoothScrollProvider>
          <Header />
          <main className="min-h-screen relative z-10 w-full">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
