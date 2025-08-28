import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "ASCE Store",
  description: "Modular craft ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <header className="border-b p-4 flex items-center justify-between text-sm">
          <nav className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/catalog">Catalogue</Link>
            <Link href="/store">Configurator</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/order">Order</Link>
            <Link href="/custom-dev">Custom Dev</Link>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t p-4 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} ASCE Platforms. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
