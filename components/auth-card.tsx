import React from "react";
import ClassLogo from "./class-logo";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="w-full max-w-md mx-auto p-6 md:p-8 rounded-2xl border border-border bg-card shadow-academic animate-fade-up">
      <div className="mb-8 flex flex-col items-center">
        <ClassLogo size="md" />
        <h1 className="text-2xl font-bold mt-6 mb-2 text-center">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-center">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
} 