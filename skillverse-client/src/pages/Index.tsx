import { HeroSection } from "@/components/shared/HeroSection";
import { Navbar } from "@/components/shared/Navbar";
import { PeerCard } from "@/components/shared/PeerCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Clock, Users, CheckCircle, Star } from "lucide-react";

// Mock featured peers
const featuredPeers = [
  {
    id: "1",
    name: "Sarah Chen",
    profileImage: "",
    headline: "Senior Frontend Developer at Google",
    skillsOffered: ["React", "TypeScript", "Next.js"],
    avgRating: 4.9,
    totalReviews: 127,
    hourlyRate: 2.5,
    isOnline: true,
  },
  {
    id: "2", 
    name: "Marcus Johnson",
    profileImage: "",
    headline: "UX Design Lead at Spotify",
    skillsOffered: ["UX Design", "Figma", "User Research"],
    avgRating: 4.8,
    totalReviews: 89,
    hourlyRate: 3.0,
    isOnline: false,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    profileImage: "",
    headline: "Data Scientist at Netflix",
    skillsOffered: ["Python", "Machine Learning", "Data Science"],
    avgRating: 4.9,
    totalReviews: 156,
    hourlyRate: 3.5,
    isOnline: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Skillverse?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most trusted platform for peer-to-peer learning with verified experts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Verified Experts</CardTitle>
                <CardDescription className="text-base">
                  All tutors are thoroughly vetted professionals with proven track records
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Flexible Scheduling</CardTitle>
                <CardDescription className="text-base">
                  Book sessions that fit your schedule, with instant confirmation
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Fair Credit System</CardTitle>
                <CardDescription className="text-base">
                  Transparent pricing with our credit system - only pay for quality sessions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Featured Expert Tutors
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn from industry leaders and experienced professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredPeers.map((peer) => (
              <PeerCard key={peer.id} peer={peer} />
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/browse" className="flex items-center space-x-2">
                <span>Explore All Tutors</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Start learning in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Find Your Expert</h3>
              <p className="text-muted-foreground">
                Browse our curated list of verified professionals and find the perfect tutor for your needs
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Book a Session</h3>
              <p className="text-muted-foreground">
                Schedule a 1-on-1 session at your convenience using our simple booking system
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-success">3</span>
              </div>
              <h3 className="text-xl font-semibold">Start Learning</h3>
              <p className="text-muted-foreground">
                Join your personalized learning session and gain new skills from industry experts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Accelerate Your Learning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of learners who are mastering new skills with expert guidance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild className="text-lg px-8 py-6 h-auto">
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6 h-auto border-white/30 text-white hover:bg-white/10">
              <Link to="/browse">Browse Tutors</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
