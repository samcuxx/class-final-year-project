"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/ui/sidebar";
import { Topbar } from "@/components/ui/topbar";
import { Footer } from "@/components/shared/footer";
import { useState, useEffect, useRef } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const appHeaderRef = useRef<HTMLElement | null>(null);
  const appFooterRef = useRef<HTMLElement | null>(null);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Hide the main app header and footer when in dashboard
  useEffect(() => {
    appHeaderRef.current = document.querySelector('header.app-header') as HTMLElement;
    appFooterRef.current = document.querySelector('footer.app-footer') as HTMLElement;
    
    if (appHeaderRef.current) {
      appHeaderRef.current.style.display = 'none';
    }
    
    if (appFooterRef.current) {
      appFooterRef.current.style.display = 'none';
    }

    return () => {
      // Restore the header and footer when leaving dashboard
      if (appHeaderRef.current) {
        appHeaderRef.current.style.display = '';
      }
      
      if (appFooterRef.current) {
        appFooterRef.current.style.display = '';
      }
    };
  }, []);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return redirect("/sign-in");
      }
      
      const role = user.user_metadata?.role || "student";
      
      // Role protection - redirect to appropriate dashboard
      if (role === "lecturer" && !user.user_metadata?.role) {
        return redirect("/dashboard/student");
      } else if (role === "student" && !user.user_metadata?.role) {
        return redirect("/dashboard/lecturer");
      }
      
      setUser(user);
      setLoading(false);
    }
    
    loadUser();
  }, []);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const role = user?.user_metadata?.role || "student";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        role={role as "lecturer" | "student"} 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <Topbar 
          user={user} 
          toggleSidebar={toggleMobileMenu}
        />
        
        {/* Page content */}
        <div className="flex-1 flex flex-col min-h-[calc(100vh-64px)]">
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
          
          {/* Dashboard footer */}
          <Footer showThemeSwitcher={false} />
        </div>
      </div>
    </div>
  );
} 