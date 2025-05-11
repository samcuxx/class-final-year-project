import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {profile.full_name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Enrolled Courses" 
          description="Access your enrolled classes"
          count="0"
          link="#"
        />
        <DashboardCard 
          title="Assignments" 
          description="View and submit your assignments"
          count="0"
          link="#"
        />
        <DashboardCard 
          title="Grades" 
          description="Track your academic performance"
          count="0"
          link="#"
        />
      </div>

      <div className="mt-8 p-6 bg-card rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4">Student Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileItem label="Name" value={profile.full_name} />
          <ProfileItem label="Email" value={profile.email} />
          <ProfileItem label="Institution" value={profile.school} />
          <ProfileItem label="Index Number" value={profile.index_number} />
          <ProfileItem label="Level/Year" value={profile.level} />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  description, 
  count, 
  link 
}: {
  title: string;
  description: string;
  count: string;
  link: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-2xl font-bold text-primary">{count}</span>
      </div>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <a 
        href={link} 
        className="mt-auto text-primary text-sm font-medium hover:underline"
      >
        View details →
      </a>
    </div>
  );
}

function ProfileItem({ 
  label, 
  value 
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold">{value}</dd>
    </div>
  );
} 