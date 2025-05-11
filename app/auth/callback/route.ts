import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    
    // After code exchange, get user to determine the proper redirect
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Check if user has completed onboarding
      const { data: profile, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();
      
      if (profile) {
        // User has completed onboarding, redirect to dashboard
        const role = user.user_metadata?.role || "student";
        return NextResponse.redirect(`${origin}/dashboard/${role}`);
      } else {
        // User needs to complete onboarding
        return NextResponse.redirect(`${origin}/protected/onboarding`);
      }
    }
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // Default fallback - redirect to onboarding
  return NextResponse.redirect(`${origin}/protected/onboarding`);
}
