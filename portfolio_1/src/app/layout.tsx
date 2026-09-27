import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "M. Divya Sree | Full-Stack & AI Systems Engineer",
  description:
    "Editorial cyberpunk portfolio of M. Divya Sree (SRGEC CSE '26). Architecting Next.js 14 applications, RAG AI systems, and high-performance interactive 3D web engineering.",
  keywords: [
    "Divya Sree",
    "Divya Sree Mukollu",
    "Full-Stack Engineer",
    "AI Systems Engineer",
    "Next.js 14",
    "RAG AI",
    "SRGEC",
    "Creative Technologist",
  ],
  authors: [{ name: "M. Divya Sree" }],
  openGraph: {
    title: "M. Divya Sree | Full-Stack & AI Systems Engineer",
    description: "Production-grade dark cyberpunk portfolio with cursor-controlled 3D video background engine and bilateral experience timeline.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${bebasNeue.variable} ${oswald.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans bg-[#030303] text-[#f5f5f5] antialiased selection:bg-cyber-brightRed selection:text-white min-h-screen relative">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
