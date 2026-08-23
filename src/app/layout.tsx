import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#00f2fe",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "DEVARA.SYS // Muhammad Devara - Backend Architect & Full Stack Developer",
  description:
    "Engineering scalable server-side infrastructure, ultra-low latency APIs, and high-performance digital neural networks.",
  keywords: [
    "Muhammad Devara",
    "Devara",
    "Backend Architect",
    "Full Stack Developer",
    "Laravel",
    "Node.js",
    "MySQL",
    "PostgreSQL",
    "Docker",
    "Next.js",
    "Indonesia Developer",
  ],
  authors: [{ name: "Muhammad Devara" }],
  openGraph: {
    title: "DEVARA.SYS // Muhammad Devara - Backend Architect",
    description:
      "Engineering scalable server-side infrastructure, ultra-low latency APIs, and high-performance digital neural networks.",
    url: "https://devara.sys",
    siteName: "DEVARA.SYS",
    images: [
      {
        url: "/assets/og.png",
        width: 1200,
        height: 630,
        alt: "DEVARA.SYS Profile",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEVARA.SYS // Muhammad Devara - Backend Architect",
    description:
      "Engineering scalable server-side infrastructure, ultra-low latency APIs, and high-performance digital neural networks.",
    images: ["/assets/og.png"],
  },
  icons: {
    icon: "/assets/siganteng.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="bg-[#06080f] text-slate-100 font-sans antialiased min-h-screen selection:bg-cyan-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
