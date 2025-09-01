import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Users, BookOpen, Star } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Learn from 
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Real Experts
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-lg">
                Connect with skilled professionals for personalized 1-on-1 learning sessions. 
                Master new skills at your own pace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild className="text-lg px-8 py-6 h-auto">
                <Link to="/browse" className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Explore Skills</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6 h-auto border-white/30 text-white hover:bg-white/10">
                <Link to="/signup">
                  <span>Start Teaching</span>
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold">1,200+</div>
                <div className="text-white/70 text-sm">Expert Tutors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15,000+</div>
                <div className="text-white/70 text-sm">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.9</div>
                <div className="text-white/70 text-sm flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Average Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Peer learning illustration" 
                className="w-full h-auto rounded-2xl shadow-2xl border border-white/20"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg p-3 shadow-large animate-bounce">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Live Session</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-3 shadow-large animate-bounce" style={{ animationDelay: '1s' }}>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">New Skill Unlocked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};