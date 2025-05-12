"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Home, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Settings, 
  PlusCircle,
  Download,
  LogOut,
  LayoutGrid,
  LucideIcon,
  X
} from "lucide-react";
import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function SidebarLink({ 
  href, 
  icon, 
  label,
  isActive,
  onClick
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarProps {
  role: "lecturer" | "student";
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ role, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const isLecturer = role === "lecturer";
  
  const lecturerNavItems: NavItem[] = [
    { href: "/dashboard/lecturer", icon: Home, label: "Dashboard Home" },
    { href: "/dashboard/lecturer/classes", icon: LayoutGrid, label: "My Classes" },
    { href: "/dashboard/lecturer/create", icon: PlusCircle, label: "Create Class" },
    { href: "/dashboard/lecturer/assignments", icon: FileText, label: "Assignments" },
    { href: "/dashboard/lecturer/resources", icon: Download, label: "Resources" },
    { href: "/dashboard/lecturer/discussions", icon: MessageSquare, label: "Discussions" },
  ];
  
  const studentNavItems: NavItem[] = [
    { href: "/dashboard/student", icon: Home, label: "Dashboard Home" },
    { href: "/dashboard/student/courses", icon: BookOpen, label: "My Courses" },
    { href: "/dashboard/student/assignments", icon: FileText, label: "Assignments" },
    { href: "/dashboard/student/discussions", icon: MessageSquare, label: "Discussions" },
    { href: "/dashboard/student/downloads", icon: Download, label: "Downloads" },
  ];
  
  const navItems = isLecturer ? lecturerNavItems : studentNavItems;

  // Mobile sidebar overlay
  const mobileSidebar = (
    <div className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'block' : 'hidden'}`}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Sidebar content */}
      <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-card border-r border-border p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center text-xl font-bold text-primary">
            <span className="text-primary">Class</span>App
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              icon={<item.icon className="h-5 w-5" />}
              label={item.label}
              isActive={pathname === item.href}
              onClick={onClose}
            />
          ))}
          
          <div className="pt-4 mt-4 border-t border-border">
            <SidebarLink
              href={`/dashboard/${role}/settings`}
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              isActive={pathname === `/dashboard/${role}/settings`}
              onClick={onClose}
            />
            
            <div className="py-2 px-3 mt-1">
              <form action={signOutAction}>
                <Button 
                  type="submit" 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Log Out
                </Button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Desktop sidebar - fixed position */}
      <div className="w-64 bg-card border-r border-border hidden md:block fixed top-0 bottom-0 left-0 z-20">
        <div className="p-4 border-b border-border">
          <Link 
            href="/" 
            className="flex items-center text-xl font-bold text-primary"
          >
            <span className="text-primary">Class</span>App
          </Link>
        </div>
        
        <nav className="p-4 space-y-1 h-[calc(100%-65px)] overflow-y-auto">
          {navItems.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              icon={<item.icon className="h-5 w-5" />}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
          
          <div className="pt-4 mt-4 border-t border-border">
            <SidebarLink
              href={`/dashboard/${role}/settings`}
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              isActive={pathname === `/dashboard/${role}/settings`}
            />
            
            <div className="py-2 px-3 mt-1">
              <form action={signOutAction}>
                <Button 
                  type="submit" 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Log Out
                </Button>
              </form>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Invisible spacer for fixed sidebar */}
      <div className="w-64 hidden md:block flex-none"></div>
      
      {/* Mobile sidebar */}
      {mobileSidebar}
    </>
  );
} 