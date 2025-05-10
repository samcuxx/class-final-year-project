import ClassLogo from "@/components/class-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Class App",
  description: "Sign in or create an account to access the Class app",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border py-4">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center">
            <ClassLogo size="sm" />
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col py-8 md:py-12">
        {children}
      </main>
      
      <footer className="border-t border-border py-4">
        <div className="container mx-auto flex flex-col items-center gap-4">
          <ThemeSwitcher />
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Class App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
