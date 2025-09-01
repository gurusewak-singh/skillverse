// src/pages/Index.tsx
import { HeroSection } from "@/components/shared/HeroSection";
import { Navbar } from "@/components/shared/Navbar";
import { PeerCard } from "@/components/shared/PeerCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Skeleton } from "@/components/ui/skeleton";

const GET_MENTORS = gql`
  query GetMentors {
    mentors(page: 1) {
      id
      name
      profileImage
      headline
      skillsOffered
      avgRating
    }
  }
`;

const Index = () => {
  const { data, loading, error } = useQuery(GET_MENTORS);
  const featuredPeers = data?.mentors.slice(0, 3) || [];

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
              The most trusted platform for peer-to-peer learning with verified
              experts
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
                  All tutors are thoroughly vetted professionals with proven
                  track records
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
                  Book sessions that fit your schedule, with instant
                  confirmation
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
                  Transparent pricing with our credit system - only pay for
                  quality sessions
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
            {loading
              ? [...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))
              : featuredPeers.map((peer) => (
                  <PeerCard
                    key={peer.id}
                    peer={{
                      ...peer,
                      totalReviews: 0,
                      hourlyRate: 1,
                      isOnline: true,
                    }}
                  />
                ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/browse" className="flex items-center space-x-2">
                <span>Explore All Tutors</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
