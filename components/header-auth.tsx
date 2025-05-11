import { signOutAction } from "@/app/actions";
import { Button } from "./ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function HeaderAuth() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Hello,</span>
        <span className="font-medium">{user.user_metadata?.full_name || user.email}</span>
        {user.user_metadata?.role && (
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {user.user_metadata.role === "lecturer" ? "Lecturer" : "Student"}
          </span>
        )}
      </div>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"} size="sm">
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/role-select">Sign up</Link>
      </Button>
    </div>
  );
}
