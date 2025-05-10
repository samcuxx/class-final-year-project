import ClassLogo from "@/components/class-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const userName = user.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/protected/welcome" className="flex items-center">
            <ClassLogo size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              {userName}
            </span>
            <form action={signOutAction}>
              <Button type="submit" variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col py-8">
        {children}
      </main>

      <footer className="border-t border-border py-4 mt-8">
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