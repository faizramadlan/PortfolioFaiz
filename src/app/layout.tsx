import "@fontsource/press-start-2p";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Faiz's Portfolio",
  description: "Portfolio of Faiz Ramadlan - Technical Consultant & Full Stack Developer. A retro gamified interactive portfolio.",
  keywords: ["Faiz Ramadlan", "Portfolio", "Technical Consultant", "Full-Stack Developer", "Next.js", "React", "TypeScript", "Gamified Portfolio", "Pixel Art"],
  authors: [{ name: "Faiz Ramadlan" }],
  creator: "Faiz Ramadlan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/faizramadlan",
    title: "Faiz's Portfolio",
    description: "Portfolio of Faiz Ramadlan - Technical Consultant & Full Stack Developer. A retro gamified interactive portfolio.",
    siteName: "Faiz's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faiz's Portfolio",
    description: "Portfolio of Faiz Ramadlan - Technical Consultant & Full Stack Developer",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M20 10 h60 v20 h-40 v10 h30 v20 h-30 v30 h-20 z' fill='%231a1a1a'/></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('theme');
              if (theme === 'light') {
                document.documentElement.classList.remove('dark');
              } else {
                document.documentElement.classList.add('dark');
              }
            })();
          `
        }} />
      </head>
      <body className={`${jakarta.className} antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
