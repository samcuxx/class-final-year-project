import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layouts/DashboardShell";
import Link from "next/link";
import { BookOpen, FileText, Download, Clock, Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function StudentDashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }

  // Check if user is a student
  if (user.user_metadata?.role !== "student") {
    redirect("/dashboard/lecturer");
  }

  // Fetch user profile data
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    // If profile doesn't exist, redirect to onboarding
    redirect("/protected/onboarding");
  }

  const firstName = profile.full_name?.split(' ')[0] || '';

  // Placeholder data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Programming Fundamentals Quiz",
      course: "Introduction to Programming",
      date: "Tomorrow, 10:00 AM",
      type: "quiz"
    },
    {
      id: 2,
      title: "Final Project Submission",
      course: "Web Development",
      date: "Friday, 11:59 PM",
      type: "assignment"
    }
  ];

  return (
    <DashboardShell 
      title="Student Dashboard" 
      subtitle={`Welcome back, ${firstName}`}
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Joined Classes" 
          value="0"
          icon={<BookOpen className="h-5 w-5" />}
          description="Total enrolled courses"
          href="/dashboard/student/courses"
        />
        <StatCard 
          title="Assignments Due" 
          value="0"
          icon={<Clock className="h-5 w-5" />}
          description="Pending submissions"
          href="/dashboard/student/assignments"
          accentColor="text-amber-500"
        />
        <StatCard 
          title="Downloaded Materials" 
          value="0"
          icon={<Download className="h-5 w-5" />}
          description="Course resources"
          href="/dashboard/student/downloads"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {upcomingEvents.length > 0 ? (
              <div className="divide-y divide-border">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 flex items-start gap-4">
                    <div className={`p-2 rounded-md bg-muted ${event.type === 'quiz' ? 'text-blue-500' : 'text-amber-500'}`}>
                      {event.type === 'quiz' ? <FileText className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.course}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <p>No recent activity to display</p>
                <Link 
                  href="/dashboard/student/courses" 
                  className="mt-2 inline-block text-primary hover:underline"
                >
                  Browse available courses
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Notifications
            <span className="inline-flex items-center justify-center rounded-full bg-primary w-5 h-5 text-xs text-primary-foreground">1</span>
          </h2>
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-md">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Welcome to ClassApp!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get started by joining your first class. If you have an enrollment code, you can enter it on the Courses page.
                  </p>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/dashboard/student/courses">Join a Class</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Links */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAccessCard 
            title="Join a Course" 
            icon={<BookOpen className="h-5 w-5" />}
            href="/dashboard/student/courses"
          />
          <QuickAccessCard 
            title="View Assignments" 
            icon={<FileText className="h-5 w-5" />}
            href="/dashboard/student/assignments"
          />
          <QuickAccessCard 
            title="Download Materials" 
            icon={<Download className="h-5 w-5" />}
            href="/dashboard/student/downloads"
          />
          <QuickAccessCard 
            title="Join Discussion" 
            icon={<Bell className="h-5 w-5" />}
            href="/dashboard/student/discussions"
          />
        </div>
      </div>
    </DashboardShell>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  href: string;
  accentColor?: string;
}

function StatCard({ 
  title, 
  value, 
  icon,
  description,
  href,
  accentColor = "text-primary"
}: StatCardProps) {
  return (
    <Link href={href}>
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-md bg-muted ${accentColor}`}>
            {icon}
          </div>
          <span className={`text-3xl font-bold ${accentColor}`}>{value}</span>
        </div>
        <h3 className="font-medium mt-4">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </Link>
  );
}

interface QuickAccessCardProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

function QuickAccessCard({ title, icon, href }: QuickAccessCardProps) {
  return (
    <Link href={href}>
      <div className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors flex items-center gap-3">
        <div className="p-2 rounded-md bg-muted text-primary">
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
    </Link>
  );
} 