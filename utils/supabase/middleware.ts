import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data: { user } } = await supabase.auth.getUser();

    // If no user is logged in
    if (!user) {
      // Protect routes that require authentication
      if (
        request.nextUrl.pathname.startsWith("/protected") ||
        request.nextUrl.pathname.startsWith("/dashboard")
      ) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
      
      // Allow access to public routes
      return response;
    }
    
    // User is logged in
    
    // If user is trying to access auth pages, redirect appropriately
    if (request.nextUrl.pathname.startsWith("/(auth-pages)") || 
        request.nextUrl.pathname.startsWith("/sign-in") || 
        request.nextUrl.pathname.startsWith("/sign-up") ||
        request.nextUrl.pathname.startsWith("/role-select")) {
      
      // Check if user has a profile
      const { data: profile } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();
      
      if (profile) {
        // User has a profile, redirect to their dashboard
        const role = user.user_metadata?.role || "student";
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
      } else {
        // User needs to complete onboarding
        return NextResponse.redirect(new URL("/protected/onboarding", request.url));
      }
    }
    
    // If user is accessing dashboard routes, check if they have a profile
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      const { data: profile, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();
      
      if (error || !profile) {
        // User needs to complete onboarding
        return NextResponse.redirect(new URL("/protected/onboarding", request.url));
      }
      
      // Check if user is accessing the correct dashboard
      const role = user.user_metadata?.role || "student";
      const correctPath = `/dashboard/${role}`;
      
      if (!request.nextUrl.pathname.startsWith(correctPath)) {
        return NextResponse.redirect(new URL(correctPath, request.url));
      }
    }
    
    // Handle root route
    if (request.nextUrl.pathname === "/") {
      // Check if user has a profile
      const { data: profile } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();
      
      if (profile) {
        // User has a profile, redirect to their dashboard
        const role = user.user_metadata?.role || "student";
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
      } else {
        // User needs to complete onboarding
        return NextResponse.redirect(new URL("/protected/onboarding", request.url));
      }
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    console.error("Supabase client error:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
