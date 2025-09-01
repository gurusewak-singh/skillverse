import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";

interface PeerCardProps {
  peer: {
    id: string;
    name: string;
    profileImage?: string;
    headline: string;
    skillsOffered: string[];
    avgRating: number;
    totalReviews: number;
    hourlyRate: number;
    isOnline?: boolean;
  };
}

export const PeerCard = ({ peer }: PeerCardProps) => {
  return (
    <Link to={`/users/${peer.id}`} className="group block">
      <Card className="h-full hover:shadow-medium transition-all duration-300 hover:scale-[1.02] bg-gradient-card border-0 shadow-soft group-hover:shadow-glow">
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white shadow-soft">
                <AvatarImage src={peer.profileImage} alt={peer.name} />
                <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
                  {peer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {peer.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                {peer.name}
              </CardTitle>
              <CardDescription className="text-sm mt-1 line-clamp-2">
                {peer.headline}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {peer.skillsOffered.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {skill}
              </Badge>
            ))}
            {peer.skillsOffered.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{peer.skillsOffered.length - 3} more
              </Badge>
            )}
          </div>

          {/* Rating and Rate */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-medium">{peer.avgRating.toFixed(1)}</span>
              <span className="text-muted-foreground">({peer.totalReviews})</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{peer.hourlyRate} credits/hr</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};