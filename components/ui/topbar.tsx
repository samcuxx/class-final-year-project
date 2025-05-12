"use client";

import { Bell, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

interface TopbarProps {
  user: {
    email?: string;
    user_metadata?: {
      full_name?: string;
      role?: string;
    };
  } | null;
  toggleSidebar?: () => void;
}

export function Topbar({ user, toggleSidebar }: TopbarProps) {
  if (!user) return null;
  
  const fullName = user.user_metadata?.full_name || user.email;
  const role = user.user_metadata?.role || "student";
  const userInitial = fullName?.charAt(0).toUpperCase() || "U";
  
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-background/95 backdrop-blur-sm sticky top-0 z-30 w-full">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden mr-2" 
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        
        <button 
          className="rounded-full h-8 w-8 flex items-center justify-center bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
        </button>
        
        <div className="hidden md:flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
            {userInitial}
          </div>
          <div>
            <div className="text-sm font-medium leading-none">
              {fullName}
            </div>
            <div className="text-xs text-muted-foreground leading-none mt-1">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </div>
          </div>
        </div>
        

      </div>
    </header>
  );
}