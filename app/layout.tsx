import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nirmal Maharjan | Full-Stack Web Developer",
  description: "BCS undergraduate building human-centered web applications, real-time systems, and practical digital solutions with React, Laravel, Firebase, and Python.",
  metadataBase: new URL("https://nirmal-maharjan.dev"),
  openGraph: {
    title: "Nirmal Maharjan | Full-Stack Web Developer",
    description: "BCS student at IIMS College delivering responsive web apps, backend systems, and real-life project solutions.",
    url: "https://nirmal-maharjan.dev",
    siteName: "Nirmal Maharjan Portfolio",
    images: [
      {
        url: "/images/project-saas.png",
        width: 1200,
        height: 630,
        alt: " Portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirmal Maharjan | Premium Full-Stack Portfolio",
    description: "Design-focused Full-Stack developer portfolio and modern creative services website.",
    images: ["/images/project-saas.png"],
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
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
