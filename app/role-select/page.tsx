import Link from 'next/link';
import { LucideGraduationCap, School } from 'lucide-react';

export default function RoleSelectPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Role</h1>
        <p className="text-muted-foreground text-lg">
          Select how you'll be using ClassApp to get a personalized experience.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
        <RoleCard 
          icon={<School className="h-12 w-12" />}
          title="I'm a Lecturer"
          description="Create courses, manage assignments, and engage with your students."
          href="/sign-up/lecturer"
          color="from-indigo-500/20 to-cyan-500/20"
        />
        
        <RoleCard 
          icon={<LucideGraduationCap className="h-12 w-12" />}
          title="I'm a Student"
          description="Join courses, submit assignments, and collaborate with peers and lecturers."
          href="/sign-up/student" 
          color="from-emerald-500/20 to-teal-500/20"
        />
      </div>
    </div>
  );
}

function RoleCard({ 
  icon, 
  title, 
  description, 
  href,
  color
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  href: string;
  color: string;
}) {
  return (
    <Link 
      href={href}
      className="flex-1 group"
    >
      <div className={`h-full flex flex-col items-center text-center p-8 rounded-xl border border-border bg-gradient-to-br ${color} transition-all hover:shadow-lg hover:scale-105 hover:border-primary/30`}>
        <div className="p-4 rounded-full bg-background border border-border mb-6 group-hover:border-primary/30 transition-colors">
          {icon}
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
} 