import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Settings, 
  Bell, 
  LogOut 
} from "lucide-react";
import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }

  const role = user.user_metadata?.role || "student";
  const isLecturer = role === "lecturer";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border hidden md:block">
        <div className="p-4 border-b border-border">
          <Link 
            href="/" 
            className="flex items-center text-xl font-bold text-primary"
          >
            <span className="text-primary">Class</span>App
          </Link>
        </div>
        
        <nav className="p-4 space-y-1">
          <SidebarLink
            href={`/dashboard/${role}`}
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
          />
          
          <SidebarLink
            href={`/dashboard/${role}/courses`}
            icon={<BookOpen className="h-5 w-5" />}
            label={isLecturer ? "My Courses" : "Enrolled Courses"}
          />
          
          <SidebarLink
            href={`/dashboard/${role}/assignments`}
            icon={<FileText className="h-5 w-5" />}
            label="Assignments"
          />
          
          <SidebarLink
            href={`/dashboard/${role}/messages`}
            icon={<MessageSquare className="h-5 w-5" />}
            label="Messages"
          />
          
          <div className="pt-4 mt-4 border-t border-border">
            <SidebarLink
              href={`/dashboard/${role}/settings`}
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
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
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
          <div className="md:hidden font-bold">
            <span className="text-primary">Class</span>App
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="rounded-full h-8 w-8 flex items-center justify-center bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium leading-none">
                  {user.user_metadata?.full_name || user.email}
                </div>
                <div className="text-xs text-muted-foreground leading-none mt-1">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
} 