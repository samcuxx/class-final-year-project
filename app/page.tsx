import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarDays, BookOpen, PenTool, Users, LucideArrowRightCircle, Shield, MessageCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Connect Students and Lecturers Seamlessly
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Your centralized hub for academic materials, assignments, and communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/role-select">
                  Get Started
                  <LucideArrowRightCircle className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/sign-in">Log In</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative flex justify-center items-center">
            <div className="rounded-lg bg-gradient-to-br from-primary/20 via-primary/5 to-background p-6 shadow-lg border border-border">
              <svg
                className="w-full h-auto max-w-md"
                viewBox="0 0 600 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* School Building */}
                <rect x="150" y="150" width="300" height="200" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2" />
                
                {/* Roof */}
                <path d="M120 150L300 70L480 150" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary))" fillOpacity="0.15" />
                
                {/* Windows */}
                <rect x="180" y="180" width="50" height="60" rx="2" fill="white" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <rect x="250" y="180" width="50" height="60" rx="2" fill="white" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <rect x="320" y="180" width="50" height="60" rx="2" fill="white" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <rect x="390" y="180" width="50" height="60" rx="2" fill="white" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                
                <rect x="180" y="260" width="50" height="60" rx="2" fill="white" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <rect x="390" y="260" width="50" height="60" rx="2" fill="white" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                
                {/* Door */}
                <rect x="275" y="280" width="70" height="70" fill="hsl(var(--primary))" />
                <rect x="280" y="285" width="60" height="65" fill="white" stroke="hsl(var(--primary))" strokeWidth="1" />
                <circle cx="290" cy="315" r="3" fill="hsl(var(--primary))" />
                
                {/* Steps */}
                <rect x="265" y="350" width="90" height="5" fill="hsl(var(--primary))" fillOpacity="0.3" />
                <rect x="270" y="355" width="80" height="5" fill="hsl(var(--primary))" fillOpacity="0.3" />
                <rect x="275" y="360" width="70" height="5" fill="hsl(var(--primary))" fillOpacity="0.3" />
                
                {/* Flag */}
                <line x1="450" y1="50" x2="450" y2="150" stroke="hsl(var(--primary))" strokeWidth="2" />
                <path d="M450 50L480 65L450 80" fill="hsl(var(--primary))" />
                
                {/* Graduation Cap */}
                <circle cx="120" cy="100" r="40" fill="hsl(var(--primary))" fillOpacity="0.1" />
                <rect x="90" y="90" width="60" height="10" fill="hsl(var(--primary))" />
                <rect x="115" y="80" width="10" height="10" fill="hsl(var(--primary))" />
                <circle cx="120" cy="80" r="5" fill="hsl(var(--primary))" />
                <path d="M90 100L120 115L150 100" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary))" fillOpacity="0.2" />
                <line x1="120" y1="115" x2="120" y2="130" stroke="hsl(var(--primary))" strokeWidth="1" />
                <circle cx="120" cy="130" r="3" fill="hsl(var(--primary))" />
                
                {/* Book */}
                <rect x="470" y="100" width="60" height="10" rx="2" fill="hsl(var(--primary))" />
                <path d="M470 100C470 90 470 80 470 80H530C530 80 530 90 530 100" fill="white" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <path d="M470 80C480 85 520 85 530 80" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1" />
                <line x1="500" y1="80" x2="500" y2="100" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-accent/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Everything you need to create an effective learning environment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Secure Class Creation"
              description="Create private, secure classrooms with role-based access controls for your courses."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Simple Enrollment"
              description="Students join classes easily through unique invites and class codes."
            />
            <FeatureCard
              icon={<PenTool className="h-10 w-10 text-primary" />}
              title="Assignment Management"
              description="Create, submit, and grade assignments with integrated feedback tools."
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Course Materials"
              description="Organize and access lecture notes, readings, and resources in one place."
            />
            <FeatureCard
              icon={<MessageCircle className="h-10 w-10 text-primary" />}
              title="Discussion Forums"
              description="Foster collaboration through course-specific discussion threads."
            />
            <FeatureCard
              icon={<CalendarDays className="h-10 w-10 text-primary" />}
              title="Schedule & Reminders"
              description="Keep track of deadlines, classes, and important academic dates."
            />
          </div>
        </div>
      </section>

      {/* Testimonials/Trust Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Trusted by Educators</h2>
          <p className="text-muted-foreground mt-2">
            Join universities and colleges already using ClassApp
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-70">
          {['University of Technology', 'State College', 'Liberal Arts Institute', 'National Academy', 'Technical University'].map((name) => (
            <div key={name} className="flex items-center justify-center">
              <div className="font-semibold text-xl">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your classroom?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of educators and students building better learning experiences together.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link href="/role-select">
              Get Started For Free
              <LucideArrowRightCircle className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="bg-background border border-border rounded-lg p-6 transition-all hover:shadow-md hover:border-primary/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
