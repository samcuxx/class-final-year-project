"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();
  const role = formData.get("role")?.toString();
  const institution = formData.get("institution")?.toString();
  const studentId = formData.get("studentId")?.toString();
  
  const supabase = await createClient();
  
  // Get redirect path based on role
  const redirectPath = role === "lecturer" ? "/sign-up/lecturer" : "/sign-up/student";

  if (!email || !password) {
    return encodedRedirect(
      "error",
      redirectPath,
      "Email and password are required",
    );
  }

  if (!firstName || !lastName) {
    return encodedRedirect(
      "error",
      redirectPath,
      "First name and last name are required",
    );
  }

  if (!role) {
    return encodedRedirect(
      "error",
      redirectPath,
      "Role selection is required",
    );
  }

  // Sign up the user with auto-confirm enabled 
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: `${firstName} ${lastName}`,
        role: role,
        institution: institution || null,
        student_id: studentId || null,
      },
      // Email confirmations are disabled in Supabase's auth settings,
      // so no need to specify emailRedirectTo 
    },
  });

  if (signUpError) {
    console.error(signUpError.code + " " + signUpError.message);
    return encodedRedirect("error", redirectPath, signUpError.message);
  }

  // Sign in the user immediately 
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (signInError) {
    console.error(signInError.code + " " + signInError.message);
    return encodedRedirect("error", redirectPath, "Sign up successful, but please sign in manually.");
  }

  // Redirect to onboarding
  return redirect("/protected/onboarding");
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createOrUpdateUserProfile = async (formData: FormData) => {
  const supabase = await createClient();
  
  // Get the current authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return encodedRedirect(
      "error",
      "/protected/onboarding",
      "Authentication error. Please sign in again."
    );
  }
  
  // Extract form data based on role
  const role = user.user_metadata?.role;
  const fullName = formData.get("fullName")?.toString() || user.user_metadata?.full_name;
  const school = formData.get("school")?.toString();
  let indexNumber = null;
  let staffId = null;
  let department = null;
  let level = null;
  
  if (!fullName || !school) {
    return encodedRedirect(
      "error",
      "/protected/onboarding",
      "Full name and school are required"
    );
  }
  
  // Role-specific fields
  if (role === "student") {
    indexNumber = formData.get("indexNumber")?.toString();
    level = formData.get("level")?.toString();
    
    if (!indexNumber || !level) {
      return encodedRedirect(
        "error",
        "/protected/onboarding",
        "Index number and current level are required"
      );
    }
  } else if (role === "lecturer") {
    staffId = formData.get("staffId")?.toString();
    department = formData.get("department")?.toString();
    
    if (!staffId || !department) {
      return encodedRedirect(
        "error",
        "/protected/onboarding",
        "Staff ID and department are required"
      );
    }
  }
  
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  
  let result;
  
  if (existingProfile) {
    // Update existing profile
    result = await supabase
      .from("users")
      .update({
        full_name: fullName,
        school,
        index_number: indexNumber,
        staff_id: staffId,
        department,
        level,
        updated_at: new Date().toISOString()
      })
      .eq("id", user.id);
  } else {
    // Create new profile
    result = await supabase
      .from("users")
      .insert({
        id: user.id,
        email: user.email,
        full_name: fullName,
        role,
        school,
        index_number: indexNumber,
        staff_id: staffId,
        department,
        level
      });
  }
  
  if (result.error) {
    console.error("Profile update error:", result.error);
    return encodedRedirect(
      "error",
      "/protected/onboarding",
      result.error.message
    );
  }
  
  // Redirect to appropriate dashboard based on role
  const dashboardPath = role === "lecturer" 
    ? "/dashboard/lecturer" 
    : "/dashboard/student";
  
  return redirect(dashboardPath);
};
