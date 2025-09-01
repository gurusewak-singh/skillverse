// src/pages/UserProfile.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { AlertCircle } from "lucide-react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import api from "@/services/api";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      name
      headline
      profileImage
      bio
      skillsOffered
      avgRating
      reviewsReceived {
        id
        rating
        comment
        createdAt
        reviewer {
          name
          profileImage
        }
      }
    }
  }
`;

const UserProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
    skip: !id,
  });

  const user = data?.user;

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !user) return;
    setIsBooking(true);
    try {
      const scheduledTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      scheduledTime.setHours(hours, minutes);

      await api.post("/bookings", {
        hostId: user.id,
        scheduledTime: scheduledTime.toISOString(),
        duration: 60, // Assuming 1-hour sessions
      });
      toast.success(
        "Session booked successfully! Awaiting mentor confirmation."
      );
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to book session.");
    } finally {
      setIsBooking(false);
    }
  };

  if (loading)
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-48 w-full" />
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div>
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );

  if (error || !user)
    return (
      <div className="container mx-auto px-4 py-8">
        <Navbar />
        <Alert variant="destructive" className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error ? "Could not load user profile." : "User not found."}
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header, About, Skills, Reviews cards using `user` data */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>About {user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{user.bio}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {user.skillsOffered.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.reviewsReceived.map((review) => (
                  <div key={review.id}>
                    <p>
                      <strong>Rating: {review.rating}/5</strong>
                    </p>
                    <p>{review.comment}</p>
                    <p className="text-sm text-muted-foreground">
                      - {review.reviewer.name}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-soft sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">1 Credit</CardTitle>
                <CardDescription>per hour session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      disabled={currentUser?.id === user.id}
                    >
                      {currentUser?.id === user.id
                        ? "This is your profile"
                        : "Book a Session"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Book a session with {user.name}</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                    />
                    <Input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    <Button
                      onClick={handleBooking}
                      disabled={isBooking || !selectedDate || !selectedTime}
                    >
                      {isBooking ? "Booking..." : "Confirm Booking"}
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
