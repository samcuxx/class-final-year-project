import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Users, Plus, Bookmark } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome | Class App",
  description: "Get started with your personalized Class experience",
};

export default async function WelcomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // In a real implementation, we would fetch the user's role from a profile table
  // For now, we'll use a mock role
  const userRole = "lecturer"; // This would come from the database
  const userName = user.email?.split('@')[0] || "there";

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 max-w-5xl">
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-academic animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Welcome, {userName}!
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {userRole === "lecturer" 
            ? "Let's set up your first class to get started." 
            : "Let's join your first class to get started."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {userRole === "lecturer" ? (
            <>
              <ActionCard
                title="Create a Class"
                description="Start a new virtual classroom for your students"
                icon={<Plus className="h-10 w-10 text-academic-emerald-light" />}
                href="/protected/create-class"
                buttonText="Create Class"
                primary
              />
              <ActionCard
                title="Class Materials"
                description="Upload and manage learning resources"
                icon={<BookOpen className="h-10 w-10 text-academic-blue-light" />}
                href="/protected/materials"
                buttonText="Manage Materials"
              />
            </>
          ) : (
            <>
              <ActionCard
                title="Join a Class"
                description="Enter a class code to join your lecturer's classroom"
                icon={<Plus className="h-10 w-10 text-academic-emerald-light" />}
                href="/protected/join-class"
                buttonText="Join Class"
                primary
              />
              <ActionCard
                title="My Classes"
                description="View all your enrolled classes and materials"
                icon={<Bookmark className="h-10 w-10 text-academic-blue-light" />}
                href="/protected/my-classes"
                buttonText="View Classes"
              />
            </>
          )}
        </div>

        <div className="bg-primary/5 rounded-xl p-6">
          <h2 className="text-xl font-medium mb-2 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Getting Started
          </h2>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-muted-foreground">
            <li>
              {userRole === "lecturer"
                ? "Create your first class to get a unique class code"
                : "Ask your lecturer for the class code to join"}
            </li>
            <li>
              {userRole === "lecturer" 
                ? "Upload materials and create assignments for your students" 
                : "Access course materials and submit assignments"}
            </li>
            <li>Participate in class discussions and announcements</li>
            <li>Set up notifications to stay updated on class activities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  buttonText: string;
  primary?: boolean;
}

function ActionCard({
  title,
  description,
  icon,
  href,
  buttonText,
  primary = false,
}: ActionCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col h-full shadow-sm hover:shadow-academic transition-shadow duration-200">
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
      <Button
        variant={primary ? "default" : "outline"}
        size="lg"
        className="w-full rounded-xl"
        asChild
      >
        <Link href={href}>{buttonText}</Link>
      </Button>
    </div>
  );
} 