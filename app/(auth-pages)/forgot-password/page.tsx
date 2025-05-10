import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/auth-card";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      <AuthCard 
        title="Reset Password" 
        subtitle="Enter your email to receive a password reset link"
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
          </div>
          
          <SubmitButton 
            formAction={forgotPasswordAction} 
            className="w-full rounded-xl"
            pendingText="Sending reset link..."
          >
            Reset Password
          </SubmitButton>
          
          <FormMessage message={searchParams} />
          
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link 
              className="text-primary font-medium hover:underline" 
              href="/sign-in"
            >
              Sign in
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
