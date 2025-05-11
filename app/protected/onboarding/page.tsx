import { createOrUpdateUserProfile } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { LucideGraduationCap, School, Briefcase, Building, BookOpen } from "lucide-react";
import { redirect } from "next/navigation";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string, success?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  const params = await searchParams;
  const message: Message = params.error 
    ? { error: params.error } 
    : params.success 
    ? { success: params.success } 
    : { message: "" };

  if (error || !user) {
    redirect("/sign-in");
  }

  // Check if user already has a profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  // If user already has a profile, redirect to their dashboard
  if (profile) {
    const role = user.user_metadata?.role || "student";
    redirect(`/dashboard/${role}`);
  }

  const role = user.user_metadata?.role;
  const fullName = user.user_metadata?.full_name || '';

  // If user doesn't have a role, redirect to role selection
  if (!role) {
    redirect("/role-select");
  }

  const isStudent = role === "student";
  const isLecturer = role === "lecturer";

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-10">
        <div className="p-3 rounded-full bg-primary/10 mb-4">
          {isStudent ? (
            <LucideGraduationCap className="h-10 w-10 text-primary" />
          ) : (
            <School className="h-10 w-10 text-primary" />
          )}
        </div>
        <h1 className="text-3xl font-bold text-center">Welcome, {fullName}</h1>
        <p className="text-center text-muted-foreground mt-2 max-w-md">
          Let's complete your {isStudent ? "student" : "lecturer"} profile to get started with ClassApp
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <form className="space-y-6">
          <input type="hidden" name="fullName" value={fullName} />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="school">School/Institution</Label>
            </div>
            <Input
              id="school"
              name="school"
              placeholder="Your school or institution"
              required
            />
          </div>

          {isStudent && (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="indexNumber">Student/Index Number</Label>
                </div>
                <Input
                  id="indexNumber"
                  name="indexNumber"
                  placeholder="Your student identification number"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <LucideGraduationCap className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="level">Current Level/Year</Label>
                </div>
                <Select name="level" required>
                  <SelectTrigger id="level" className="w-full">
                    <SelectValue placeholder="Select your current level/year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Year 1 / Freshman</SelectItem>
                    <SelectItem value="2">Year 2 / Sophomore</SelectItem>
                    <SelectItem value="3">Year 3 / Junior</SelectItem>
                    <SelectItem value="4">Year 4 / Senior</SelectItem>
                    <SelectItem value="5">Year 5</SelectItem>
                    <SelectItem value="masters">Masters</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {isLecturer && (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="staffId">Staff ID</Label>
                </div>
                <Input
                  id="staffId"
                  name="staffId"
                  placeholder="Your staff identification number"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="department">Department</Label>
                </div>
                <Input
                  id="department"
                  name="department"
                  placeholder="Your academic department"
                  required
                />
              </div>
            </>
          )}

          <SubmitButton 
            formAction={createOrUpdateUserProfile} 
            pendingText="Saving your profile..."
            className="w-full"
          >
            Complete Setup
          </SubmitButton>
          
          <FormMessage message={message} />
        </form>
      </div>
    </div>
  );
} 