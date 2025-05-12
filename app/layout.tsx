import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { Footer } from "@/components/shared/footer";
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
              <header className="app-header w-full">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                  <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-5 items-center">
                      <Link href={"/"} className="font-bold text-lg flex items-center gap-1.5">
                        <span className="text-primary">Class</span>App
                      </Link>
                    </div>
                    <div className="flex gap-2">
                      <Link href="/sign-in" className="text-sm px-4 py-2 rounded-md border border-input hover:bg-accent">
                        Sign in
                      </Link>
                      <Link href="/role-select" className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </nav>
              </header>
              <div className="flex flex-col w-full flex-grow">
                {children}
              </div>

              <Footer className="app-footer" />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
