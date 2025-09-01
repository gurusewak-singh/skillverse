import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PeerCard } from "@/components/shared/PeerCard";
import { Navbar } from "@/components/shared/Navbar";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

// Mock data
const mockPeers = [
  {
    id: "1",
    name: "Sarah Chen",
    profileImage: "",
    headline: "Senior Frontend Developer with 8+ years at Google. Specializing in React, TypeScript, and modern web development.",
    skillsOffered: ["React", "TypeScript", "Next.js", "JavaScript", "CSS"],
    avgRating: 4.9,
    totalReviews: 127,
    hourlyRate: 2.5,
    isOnline: true,
  },
  {
    id: "2", 
    name: "Marcus Johnson",
    profileImage: "",
    headline: "UX Design Lead at Spotify. Expert in user research, prototyping, and design systems.",
    skillsOffered: ["UX Design", "Figma", "User Research", "Prototyping"],
    avgRating: 4.8,
    totalReviews: 89,
    hourlyRate: 3.0,
    isOnline: false,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    profileImage: "",
    headline: "Data Scientist at Netflix. PhD in Machine Learning with expertise in Python and AI.",
    skillsOffered: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
    avgRating: 4.9,
    totalReviews: 156,
    hourlyRate: 3.5,
    isOnline: true,
  },
  {
    id: "4",
    name: "David Kim",
    profileImage: "",
    headline: "DevOps Engineer and AWS Solutions Architect. 10+ years in cloud infrastructure.",
    skillsOffered: ["AWS", "Docker", "Kubernetes", "DevOps", "Linux"],
    avgRating: 4.7,
    totalReviews: 73,
    hourlyRate: 2.8,
    isOnline: true,
  },
  {
    id: "5",
    name: "Jessica Williams",
    profileImage: "",
    headline: "Marketing Director with expertise in digital strategy, SEO, and content marketing.",
    skillsOffered: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    avgRating: 4.8,
    totalReviews: 92,
    hourlyRate: 2.2,
    isOnline: false,
  },
  {
    id: "6",
    name: "Alex Thompson",
    profileImage: "",
    headline: "Full-stack developer and startup founder. Expert in building scalable web applications.",
    skillsOffered: ["Node.js", "MongoDB", "GraphQL", "React", "Startup Advice"],
    avgRating: 4.9,
    totalReviews: 134,
    hourlyRate: 2.7,
    isOnline: true,
  },
];

const skillCategories = [
  "All Skills",
  "Programming",
  "Design", 
  "Marketing",
  "Data Science",
  "Business",
  "Languages",
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Skills");
  const [sortBy, setSortBy] = useState("rating");

  const filteredPeers = mockPeers.filter(peer => {
    const matchesSearch = peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         peer.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         peer.skillsOffered.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Skills" || 
                           peer.skillsOffered.some(skill => 
                             getCategoryForSkill(skill) === selectedCategory
                           );
    
    return matchesSearch && matchesCategory;
  });

  function getCategoryForSkill(skill: string): string {
    const skillMap: Record<string, string> = {
      "React": "Programming",
      "TypeScript": "Programming", 
      "JavaScript": "Programming",
      "Python": "Programming",
      "Node.js": "Programming",
      "UX Design": "Design",
      "Figma": "Design",
      "Digital Marketing": "Marketing",
      "SEO": "Marketing",
      "Machine Learning": "Data Science",
      "Data Science": "Data Science",
    };
    return skillMap[skill] || "Business";
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Discover Expert Tutors
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect mentor to accelerate your learning journey in any skill
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-soft border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by skill, name, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredPeers.length} expert{filteredPeers.length !== 1 ? 's' : ''}
            </p>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{filteredPeers.filter(p => p.isOnline).length} online now</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPeers.map((peer) => (
              <PeerCard key={peer.id} peer={peer} />
            ))}
          </div>

          {filteredPeers.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No experts found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Skills");
              }}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;