import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layouts/DashboardShell";
import Link from "next/link";
import { LayoutGrid, FileText, Users, PlusCircle, Calendar, Bell, BookOpen, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function LecturerDashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }

  // Check if user is a lecturer
  if (user.user_metadata?.role !== "lecturer") {
    redirect("/dashboard/student");
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

  // Get title prefix (Dr., Prof., etc.) or default to empty string
  const titlePrefix = profile.title || '';
  const firstName = profile.full_name?.split(' ')[0] || '';
  const displayName = titlePrefix ? `${titlePrefix} ${firstName}` : firstName;

  // Placeholder data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Programming Fundamentals Lecture",
      course: "Introduction to Programming",
      date: "Today, 2:00 PM",
      type: "lecture"
    },
    {
      id: 2,
      title: "Web Development Lab Session",
      course: "Web Development",
      date: "Tomorrow, 10:00 AM",
      type: "lab"
    }
  ];

  return (
    <DashboardShell 
      title="Lecturer Dashboard" 
      subtitle={`Hello, ${displayName}`}
    >
      {/* Create Class Button */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <Link href="/dashboard/lecturer/create">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Class
          </Button>
        </Link>
        <Link href="/dashboard/lecturer/assignments/create">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Create Assignment
          </Button>
        </Link>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Classes" 
          value="0"
          icon={<LayoutGrid className="h-5 w-5" />}
          description="Active courses you teach"
          href="/dashboard/lecturer/classes"
        />
        <StatCard 
          title="Active Students" 
          value="0"
          icon={<Users className="h-5 w-5" />}
          description="Students enrolled in your courses"
          href="/dashboard/lecturer/students"
          accentColor="text-green-500"
        />
        <StatCard 
          title="Assignments Due" 
          value="0"
          icon={<FileText className="h-5 w-5" />}
          description="Pending submissions to review"
          href="/dashboard/lecturer/assignments"
          accentColor="text-amber-500"
        />
        <StatCard 
          title="Resources" 
          value="0"
          icon={<BookOpen className="h-5 w-5" />}
          description="Uploaded teaching materials"
          href="/dashboard/lecturer/resources"
          accentColor="text-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Upcoming Schedule */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Upcoming Schedule</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {upcomingEvents.length > 0 ? (
              <div className="divide-y divide-border">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 flex items-start gap-4">
                    <div className={`p-2 rounded-md bg-muted ${event.type === 'lecture' ? 'text-primary' : 'text-green-500'}`}>
                      {event.type === 'lecture' ? <BookOpen className="h-5 w-5" /> : <BarChart className="h-5 w-5" />}
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
                <p>No upcoming events to display</p>
                <Link 
                  href="/dashboard/lecturer/create" 
                  className="mt-2 inline-block text-primary hover:underline"
                >
                  Create your first class
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
                    Get started by creating your first class and inviting your students.
                  </p>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/dashboard/lecturer/create">Create Class</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-4">
            <QuickTip 
              title="Create a Class" 
              description="Set up your first class with course materials and assignments"
              href="/dashboard/lecturer/create"
            />
            <QuickTip 
              title="Upload Resources" 
              description="Share lecture notes, slides, and reading materials"
              href="/dashboard/lecturer/resources"
            />
            <QuickTip 
              title="Create Assignments" 
              description="Design assignments and track student submissions"
              href="/dashboard/lecturer/assignments"
            />
          </ul>
        </div>
      </div>

      {/* Quick Access Links */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAccessCard 
            title="Manage Classes" 
            icon={<LayoutGrid className="h-5 w-5" />}
            href="/dashboard/lecturer/classes"
          />
          <QuickAccessCard 
            title="View Assignments" 
            icon={<FileText className="h-5 w-5" />}
            href="/dashboard/lecturer/assignments"
          />
          <QuickAccessCard 
            title="Manage Resources" 
            icon={<BookOpen className="h-5 w-5" />}
            href="/dashboard/lecturer/resources"
          />
          <QuickAccessCard 
            title="View Schedule" 
            icon={<Calendar className="h-5 w-5" />}
            href="/dashboard/lecturer/schedule"
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

interface QuickTipProps {
  title: string;
  description: string;
  href: string;
}

function QuickTip({ title, description, href }: QuickTipProps) {
  return (
    <li className="flex">
      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
        {title.charAt(0)}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Link 
          href={href} 
          className="text-sm text-primary hover:underline mt-1 inline-block"
        >
          Get started →
        </Link>
      </div>
    </li>
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