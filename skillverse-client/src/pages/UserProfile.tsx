import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Star, MapPin, Clock, Users, CheckCircle, Calendar as CalendarIcon, MessageCircle } from "lucide-react";

const UserProfile = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookingStep, setBookingStep] = useState<"date" | "time" | "confirm">("date");

  // Mock user data
  const user = {
    id: "1",
    name: "Sarah Chen",
    headline: "Senior Frontend Developer with 8+ years at Google",
    location: "San Francisco, CA",
    profileImage: "",
    bio: "I'm a passionate frontend developer with extensive experience building scalable web applications at Google. I specialize in React, TypeScript, and modern web development practices. I love mentoring developers and sharing knowledge about clean code, performance optimization, and best practices.",
    skillsOffered: ["React", "TypeScript", "Next.js", "JavaScript", "CSS", "Performance Optimization"],
    experience: "8+ years",
    hourlyRate: 2.5,
    avgRating: 4.9,
    totalReviews: 127,
    sessionsCompleted: 245,
    responseTime: "< 2 hours",
    isOnline: true,
    availability: {
      timezone: "PST",
      slots: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]
    }
  };

  const reviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 5,
      comment: "Sarah is an exceptional mentor! Her React expertise helped me land my dream job.",
      date: "2 weeks ago",
      avatar: ""
    },
    {
      id: 2,
      author: "Emily Wilson",
      rating: 5,
      comment: "Amazing session on TypeScript. Sarah explains complex concepts very clearly.",
      date: "1 month ago",
      avatar: ""
    },
    {
      id: 3,
      author: "Mike Johnson",
      rating: 4,
      comment: "Great insights on performance optimization. Highly recommend!",
      date: "2 months ago",
      avatar: ""
    }
  ];

  const handleBooking = () => {
    // Simulate booking
    console.log("Booking session for", selectedDate, "at", selectedTime);
    setBookingStep("date");
    setSelectedTime("");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="border-0 shadow-soft bg-gradient-card">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-medium">
                      <AvatarImage src={user.profileImage} alt={user.name} />
                      <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {user.isOnline && (
                      <div className="absolute -bottom-2 -right-2 flex items-center space-x-1 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                        <div className="w-2 h-2 bg-success-foreground rounded-full"></div>
                        <span>Online</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{user.headline}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{user.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{user.sessionsCompleted} sessions completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Reviews ({user.totalReviews})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.avatar} alt={review.author} />
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{review.author}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-warning text-warning"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                    {review.id < reviews.length && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            <Card className="border-0 shadow-soft sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{user.hourlyRate} Credits</CardTitle>
                    <CardDescription>per hour session</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="font-medium">{user.avgRating}</span>
                      <span className="text-muted-foreground">({user.totalReviews})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response time:</span>
                    <span className="font-medium">{user.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Timezone:</span>
                    <span className="font-medium">{user.availability.timezone}</span>
                  </div>
                </div>

                <Separator />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="hero" size="lg">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Book a Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Book a session with {user.name}</DialogTitle>
                      <DialogDescription>
                        Select your preferred date and time for a 1-hour learning session.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {bookingStep === "date" && (
                        <div>
                          <h4 className="font-medium mb-3">Select a date</h4>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                            className="rounded-md border"
                          />
                          <Button 
                            className="w-full mt-4" 
                            onClick={() => setBookingStep("time")}
                            disabled={!selectedDate}
                          >
                            Continue
                          </Button>
                        </div>
                      )}

                      {bookingStep === "time" && (
                        <div>
                          <h4 className="font-medium mb-3">Select a time</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {user.availability.slots.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                onClick={() => setSelectedTime(time)}
                                className="text-sm"
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" onClick={() => setBookingStep("date")}>
                              Back
                            </Button>
                            <Button 
                              className="flex-1" 
                              onClick={() => setBookingStep("confirm")}
                              disabled={!selectedTime}
                            >
                              Continue
                            </Button>
                          </div>
                        </div>
                      )}

                      {bookingStep === "confirm" && (
                        <div>
                          <h4 className="font-medium mb-3">Confirm booking</h4>
                          <div className="bg-gradient-subtle p-4 rounded-lg space-y-2">
                            <div className="flex justify-between">
                              <span>Tutor:</span>
                              <span className="font-medium">{user.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Date:</span>
                              <span className="font-medium">{selectedDate?.toDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time:</span>
                              <span className="font-medium">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span className="font-medium">1 hour</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Total:</span>
                              <span>{user.hourlyRate} Credits</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" onClick={() => setBookingStep("time")}>
                              Back
                            </Button>
                            <Button variant="success" className="flex-1" onClick={handleBooking}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Confirm Booking
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;