import "@fontsource/press-start-2p";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Faiz's Portfolio",
  description: "Portfolio of Faiz Ramadlan - Technical Consultant & Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-press-start bg-pixel text-pixel-foreground antialiased">
        <nav className="w-full flex justify-center pixel-border bg-pixel-yellow py-3 mb-8">
          <ul className="flex gap-8 text-pixel-green text-xs">
            <li><Link href="/" className="hover:text-pixel-orange">Faiz&apos;s Portfolio</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
