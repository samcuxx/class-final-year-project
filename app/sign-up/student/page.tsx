import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LucideGraduationCap } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function StudentSignupPage(props: {
  searchParams: Promise<{ error?: string, success?: string }>;
}) {
  const searchParams = await props.searchParams;
  const message: Message = searchParams.error 
    ? { error: searchParams.error } 
    : searchParams.success 
    ? { success: searchParams.success } 
    : { message: "" };
    
  if (searchParams.success) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto py-10">
      <div className="flex flex-col items-center mb-8">
        <div className="p-3 rounded-full bg-primary/10 mb-4">
          <LucideGraduationCap className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Join as a Student</h1>
        <p className="text-center text-muted-foreground mt-2">
          Sign up to access course materials and collaborate with your peers
        </p>
      </div>
      
      {searchParams.error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            {searchParams.error}
          </AlertDescription>
        </Alert>
      )}
      
      <form className="bg-card border border-border rounded-lg p-8 shadow-sm">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input name="firstName" id="firstName" placeholder="Jane" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input name="lastName" id="lastName" placeholder="Doe" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input name="email" id="email" type="email" placeholder="jane.doe@example.com" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Create a secure password"
              minLength={8}
              required
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters long
            </p>
          </div>
          
          <input type="hidden" name="role" value="student" />
          
          <SubmitButton 
            formAction={signUpAction} 
            pendingText="Creating account..."
            className="w-full mt-2"
          >
            Create Student Account
          </SubmitButton>
          
          <p className="text-sm text-center text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link className="text-primary font-medium hover:underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
} 