import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, User, Star, CheckCircle, XCircle, Edit3, Plus, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";

const Dashboard = () => {
  const [profileEdit, setProfileEdit] = useState(false);

  // Mock user data
  const currentUser = {
    name: "Alex Thompson",
    email: "alex@example.com",
    avatar: "",
    credits: 12.5,
    bio: "Full-stack developer passionate about teaching React and Node.js",
    skills: ["React", "Node.js", "TypeScript", "GraphQL"],
    hourlyRate: 2.0
  };

  // Mock sessions data
  const sessions = [
    {
      id: "1",
      peer: { name: "Sarah Chen", avatar: "" },
      scheduledTime: "2024-01-15T14:00:00Z",
      status: "CONFIRMED",
      role: "learning",
      skill: "React"
    },
    {
      id: "2",
      peer: { name: "Marcus Johnson", avatar: "" },
      scheduledTime: "2024-01-12T16:00:00Z",
      status: "COMPLETED",
      role: "hosting",
      skill: "Node.js"
    },
    {
      id: "3",
      peer: { name: "Emily Rodriguez", avatar: "" },
      scheduledTime: "2024-01-10T10:00:00Z",
      status: "COMPLETED",
      role: "learning",
      skill: "TypeScript"
    }
  ];

  // Mock transaction history
  const transactions = [
    {
      id: "1",
      type: "EARNED",
      amount: 2.5,
      description: "Session with Marcus Johnson - Node.js",
      date: "2024-01-12"
    },
    {
      id: "2",
      type: "SPENT",
      amount: 3.0,
      description: "Session with Emily Rodriguez - TypeScript",
      date: "2024-01-10"
    },
    {
      id: "3",
      type: "EARNED",
      amount: 2.0,
      description: "Session with John Doe - React",
      date: "2024-01-08"
    },
    {
      id: "4",
      type: "PURCHASED",
      amount: 15.0,
      description: "Credit purchase",
      date: "2024-01-05"
    }
  ];

  const upcomingSessions = sessions.filter(s => s.status === "CONFIRMED");
  const pastSessions = sessions.filter(s => s.status === "COMPLETED");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const SessionCard = ({ session, role }: { session: any, role: string }) => (
    <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={session.peer.avatar} alt={session.peer.name} />
              <AvatarFallback>{session.peer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{session.peer.name}</h3>
              <p className="text-sm text-muted-foreground">{session.skill}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(session.scheduledTime)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>1 hour</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant={session.status === "CONFIRMED" ? "default" : "secondary"}>
              {session.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {role === "hosting" ? "You are Hosting" : "You are Learning"}
            </Badge>
          </div>
        </div>
        
        {session.status === "CONFIRMED" && role === "hosting" && (
          <div className="flex space-x-2 mt-4">
            <Button size="sm" variant="success">
              <CheckCircle className="w-4 h-4 mr-1" />
              Confirm
            </Button>
            <Button size="sm" variant="outline">
              <XCircle className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        )}
        
        {session.status === "COMPLETED" && (
          <div className="flex space-x-2 mt-4">
            <Button size="sm" variant="outline">
              <Star className="w-4 h-4 mr-1" />
              Leave Review
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar 
        isAuthenticated={true} 
        user={currentUser}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your learning sessions and profile</p>
        </div>

        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="space-y-6">
            {/* Upcoming Sessions */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Sessions</span>
                </CardTitle>
                <CardDescription>
                  Your confirmed learning and teaching sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <SessionCard key={session.id} session={session} role={session.role} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming sessions</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Past Sessions */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Session History</CardTitle>
                <CardDescription>Your completed learning and teaching sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {pastSessions.length > 0 ? (
                  <div className="space-y-4">
                    {pastSessions.map((session) => (
                      <SessionCard key={session.id} session={session} role={session.role} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No session history</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Manage your public profile and teaching details</CardDescription>
                  </div>
                  <Dialog open={profileEdit} onOpenChange={setProfileEdit}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Update your profile information</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue={currentUser.name} />
                        </div>
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea id="bio" defaultValue={currentUser.bio} />
                        </div>
                        <div>
                          <Label htmlFor="rate">Hourly Rate (Credits)</Label>
                          <Input id="rate" type="number" defaultValue={currentUser.hourlyRate} />
                        </div>
                        <Button className="w-full" onClick={() => setProfileEdit(false)}>
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="bg-gradient-primary text-white text-xl">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold">{currentUser.name}</h3>
                    <p className="text-muted-foreground mt-1">{currentUser.email}</p>
                    <p className="mt-4">{currentUser.bio}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Skills You Teach</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Skill
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                    <p className="text-lg font-semibold">{currentUser.hourlyRate} Credits</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-lg font-semibold">{currentUser.credits} Credits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Transaction History</span>
                </CardTitle>
                <CardDescription>Track your credit earnings and spending</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              transaction.type === "EARNED" ? "default" : 
                              transaction.type === "SPENT" ? "destructive" : "secondary"
                            }
                            className="flex items-center space-x-1 w-fit"
                          >
                            {transaction.type === "EARNED" ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            <span>{transaction.type}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="text-right font-medium">
                          <span className={
                            transaction.type === "EARNED" ? "text-success" : 
                            transaction.type === "SPENT" ? "text-destructive" : "text-foreground"
                          }>
                            {transaction.type === "EARNED" ? "+" : "-"}{transaction.amount} Credits
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;