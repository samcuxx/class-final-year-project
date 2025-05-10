"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/auth-card";
import RoleSelector from "@/components/role-selector";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState<"student" | "lecturer">("student");
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      <AuthCard 
        title="Create an Account" 
        subtitle="Join Class to enhance your educational experience"
      >
        <form className="w-full space-y-6">
          <RoleSelector 
            selectedRole={selectedRole} 
            onRoleChange={setSelectedRole} 
          />
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  name="firstName" 
                  placeholder="First Name" 
                  className="rounded-xl"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  name="lastName" 
                  placeholder="Last Name" 
                  className="rounded-xl"
                  required 
                />
              </div>
            </div>
            
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
            
            {selectedRole === "student" && (
              <div className="space-y-2">
                <Label htmlFor="indexNumber">Index Number</Label>
                <Input 
                  id="indexNumber"
                  name="indexNumber" 
                  placeholder="Your student index number" 
                  className="rounded-xl"
                  required 
                />
              </div>
            )}
            
            {selectedRole === "lecturer" && (
              <div className="space-y-2">
                <Label htmlFor="staffId">Staff ID</Label>
                <Input 
                  id="staffId"
                  name="staffId" 
                  placeholder="Your staff ID" 
                  className="rounded-xl"
                  required 
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Create a strong password"
                className="rounded-xl"
                minLength={6}
                required
              />
            </div>
          </div>
          
          <SubmitButton 
            formAction={signUpAction} 
            pendingText="Signing up..."
            className="w-full rounded-xl"
          >
            Create Account
          </SubmitButton>
          
          <div className="text-center text-sm">
            Already have an account?{" "}
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
