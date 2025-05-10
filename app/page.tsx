import ClassLogo from "@/components/class-logo";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { BookOpen, Users, BookCopy, CalendarDays } from "lucide-react";

export const metadata = {
  title: "Class - Student and Lecturer Interaction App",
  description: "Connect, collaborate, and learn together with our Class app. Join classes, share materials, submit assignments, and engage in discussions — all in one place.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4">
          <ClassLogo size="md" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto">
        <section className="py-12 md:py-20 flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          <div className="flex-1 space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Empowering Students & Lecturers to Connect and Collaborate
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Join classes, share materials, submit assignments, and engage in discussions — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-primary/5 rounded-2xl p-8 flex items-center justify-center animate-fade-up animation-delay-200">
              <div className="grid grid-cols-2 gap-6">
                <FeatureCard 
                  icon={<BookOpen className="h-8 w-8 text-academic-blue-light" />}
                  title="Course Materials"
                />
                <FeatureCard 
                  icon={<Users className="h-8 w-8 text-academic-emerald-light" />}
                  title="Class Discussions"
                />
                <FeatureCard 
                  icon={<BookCopy className="h-8 w-8 text-academic-amber-light" />}
                  title="Assignments"
                />
                <FeatureCard 
                  icon={<CalendarDays className="h-8 w-8 text-academic-blue" />}
                  title="Class Schedule"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary/5 border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center gap-4">
          <ThemeSwitcher />
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Class App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="bg-card p-4 rounded-xl shadow-academic flex flex-col items-center text-center">
      {icon}
      <h3 className="font-medium mt-2">{title}</h3>
    </div>
  );
}
