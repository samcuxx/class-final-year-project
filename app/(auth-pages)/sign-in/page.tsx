import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function LoginPage(props: { searchParams: Promise<{ error?: string, success?: string }> }) {
  const searchParams = await props.searchParams;
  const message: Message = searchParams.error 
    ? { error: searchParams.error } 
    : searchParams.success 
    ? { success: searchParams.success } 
    : { message: "" };
  
  return (
    <div className="w-full max-w-md mx-auto py-10">
      <div className="flex flex-col items-center mb-8">
        <div className="p-3 rounded-full bg-primary/10 mb-4">
          <LogIn className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-center text-muted-foreground mt-2">
          Sign in to your ClassApp account
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
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" placeholder="you@example.com" required />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-primary hover:underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              required
            />
          </div>
          
          <SubmitButton 
            formAction={signInAction} 
            pendingText="Signing In..." 
            className="w-full mt-2"
          >
            Sign in
          </SubmitButton>
          
          <FormMessage message={message} />
          
          <p className="text-sm text-center text-muted-foreground mt-4">
            Don't have an account?{" "}
            <Link className="text-primary font-medium hover:underline" href="/role-select">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
