import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Footer } from "@/components/Footer";
import Head from "next/head";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: {
    default: "Ekovibe | Destination & Vibes",
    template: "%s | Ekovibe",
  },
  description:
    "Ekovibe is Nigeria’s first multi-dimensional lifestyle ecosystem. We curate, facilitate, and celebrate the pinnacle of modern African living through elite reservations, bespoke concierge, and premium culture.",
  keywords: [
    "Ekovibe",
    "Lagos nightlife",
    "luxury concierge Nigeria",
    "exclusive restaurant reservations Lagos",
    "premium event ticketing",
    "African luxury lifestyle",
    "Lagos socialite access",
    "Adire fashion",
    "Vibe-Wear",
    "Tomiwa",
    "Adelae",
    "Tomiwa Adelae",
  ],
  metadataBase: new URL("https://ekovibe.com.ng"), // Replace with your actual production URL
  authors: [{ name: "Ekovibe Team" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://ekovibe.com.ng",
    siteName: "Ekovibe | Destination & Vibes",
    title: "Ekovibe | Nigeria's Premier Life-OS",
    description:
      "Bridging the gap between desire and reality with elite access to the world's most sought-after experiences.",
    images: [
      {
        url: "/assets/og-image.png", // Recommended: Use a cinematic shot of Lagos or your logo-3
        width: 1200,
        height: 630,
        alt: "Ekovibe - Destination & Vibes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekovibe | Destination & Vibes",
    description: "The ultimate curator of the vibe in Lagos and beyond.",
    images: ["/assets/og-image.png"],
    creator: "@ekovibe_ng",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:image" content="/assets/og-image.png" />
        <meta property="og:image" content="/assets/og-image.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta
          data-n-head="ssr"
          data-hid="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1"
        />
      </Head>
      <body className={`${outfit.className} antialiased bg-black`}>
        {children}
        <Footer />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
