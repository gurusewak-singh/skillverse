// src/pages/Browse.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PeerCard } from "@/components/shared/PeerCard";
import { Navbar } from "@/components/shared/Navbar";
import { Search, Filter, SlidersHorizontal, AlertCircle } from "lucide-react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const GET_MENTORS = gql`
  query GetMentors($skill: String) {
    mentors(skill: $skill) {
      id
      name
      profileImage
      headline
      skillsOffered
      avgRating
    }
  }
`;

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, loading, error } = useQuery(GET_MENTORS, {
    variables: { skill: selectedCategory || null },
  });

  const filteredPeers =
    data?.mentors.filter(
      (peer) =>
        peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        peer.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        peer.skillsOffered.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ) || [];

  const skillCategories = [
    "Programming",
    "React",
    "TypeScript",
    "Design",
    "Marketing",
    "Data Science",
    "Business",
    "Languages",
  ];

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
            Find the perfect mentor to accelerate your learning journey in any
            skill
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
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48 h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {skillCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load mentors. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPeers.map((peer) => (
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
        )}

        {!loading && filteredPeers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No experts found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
