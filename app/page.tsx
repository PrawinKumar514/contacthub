import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Search, Edit, BarChart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">ContactHub</span>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 space-y-20">
        {/* Hero */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight">
            Manage your contacts <br />
            <span className="text-primary">effortlessly</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A modern, full-stack contact management system built with Next.js, MongoDB, and ShadCN UI.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <Users className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Full CRUD</h3>
              <p className="text-muted-foreground">Create, read, update, and delete contacts with ease.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <Search className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Search & Sort</h3>
              <p className="text-muted-foreground">Find contacts by name, email, company, or phone.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <BarChart className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Dashboard Insights</h3>
              <p className="text-muted-foreground">View statistics and recent activity at a glance.</p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center bg-primary/5 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold">Ready to organize your contacts?</h2>
          <p className="text-muted-foreground mt-2">Start managing your network today.</p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/dashboard">Launch ContactHub</Link>
          </Button>
        </section>
      </main>

      <footer className="border-t py-6 mt-12 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ContactHub. Built with Next.js &amp; MongoDB.</p>
      </footer>
    </div>
  );
}