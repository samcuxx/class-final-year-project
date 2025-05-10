import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/auth-card";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      <AuthCard 
        title="Welcome Back" 
        subtitle="Sign in to continue with your Class account"
      >
        <form className="w-full space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email" 
                type="email"
                placeholder="you@example.com" 
                className="rounded-xl"
                required 
              />
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
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="rounded-xl"
                required
              />
            </div>
          </div>
          
          <SubmitButton 
            pendingText="Signing In..." 
            formAction={signInAction}
            className="w-full rounded-xl"
          >
            Sign In
          </SubmitButton>
          
          <FormMessage message={searchParams} />
          
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link 
              className="text-primary font-medium hover:underline" 
              href="/sign-up"
            >
              Sign up
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
