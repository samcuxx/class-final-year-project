import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ClassApp - Connect Students and Lecturers",
  description: "Your centralized hub for academic materials, assignments, and communication",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-6 md:gap-12 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center">
                    <Link href={"/"} className="font-bold text-lg flex items-center gap-1.5">
                      <span className="text-primary">Class</span>App
                    </Link>
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div className="flex flex-col w-full">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-10">
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 px-6">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <Link href={"/"} className="font-semibold">
                      <span className="text-primary">Class</span>App
                    </Link>
                    <div className="flex gap-4 text-muted-foreground">
                      <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                      <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-muted-foreground">
                      © {new Date().getFullYear()} ClassApp. All rights reserved.
                    </p>
                    <ThemeSwitcher />
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
