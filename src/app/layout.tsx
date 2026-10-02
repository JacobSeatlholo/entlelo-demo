import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entlelo Group | Fencing & Scaffolding Contractors in Johannesburg, Gauteng",
  description:
    "CIDB 6-rated, 100% black-owned contractor serving Johannesburg & Gauteng. Clear view fencing, scaffolding supply & fit, steel fabrication with in-house welding, and civil construction for homeowners and developers. Free quotes: 083 710 3475.",
  keywords: [
    "fencing Johannesburg",
    "Clear Vu fencing Gauteng",
    "clear view fencing installers",
    "scaffolding hire Johannesburg",
    "scaffolding contractors Gauteng",
    "steel gates Johannesburg",
    "welding fabrication Gauteng",
    "CIDB 6 contractor",
    "black-owned construction company",
    "civil construction Johannesburg",
    "security fencing South Africa",
    "Entlelo Group",
  ],
  authors: [{ name: "Entlelo Group" }],
  metadataBase: new URL("https://entlelo.co.za"),
  openGraph: {
    title: "Entlelo Group | Fencing & Scaffolding Contractors in Johannesburg",
    description:
      "Clear view fencing, scaffolding, steel fabrication & civil construction. CIDB 6 rated, 100% black-owned, serving Johannesburg homeowners and developers.",
    url: "https://entlelo.co.za",
    siteName: "Entlelo Group",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entlelo Group | Fencing & Scaffolding Johannesburg",
    description:
      "CIDB 6-rated contractor for clear view fencing, scaffolding, steel & civil works across Gauteng.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
