// src/pages/Dashboard.tsx
import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  Edit3,
  Plus,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Transaction } from "@/types";

const Dashboard = () => {
  const { user, isLoading: isAuthLoading, fetchUser } = useAuth();
  const [profileEdit, setProfileEdit] = useState(false);
  const queryClient = useQueryClient();

  // Fetch transaction history
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
  } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: () => api.get("/ledger/history").then((res) => res.data),
    enabled: !!user,
  });

  // Mutation for updating user profile
  const updateProfileMutation = useMutation({
    mutationFn: (updatedData: any) => api.patch("/users/me", updatedData),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setProfileEdit(false);
      fetchUser(); // Refetch user data in auth context
      queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
    },
    onError: (error) => {
      toast.error("Failed to update profile. Please try again.");
      console.error(error);
    },
  });

  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      headline: formData.get("headline"),
    };
    updateProfileMutation.mutate(data);
  };

  // ASSUMPTION: Backend does not provide an endpoint to fetch user sessions.
  // Using mock data for demonstration.
  const sessions = [
    {
      id: "1",
      peer: { name: "Sarah Chen", avatar: "" },
      scheduledTime: "2024-01-15T14:00:00Z",
      status: "CONFIRMED",
      role: "learning",
      skill: "React",
    },
    {
      id: "2",
      peer: { name: "Marcus Johnson", avatar: "" },
      scheduledTime: "2024-01-12T16:00:00Z",
      status: "COMPLETED",
      role: "hosting",
      skill: "Node.js",
    },
  ];
  const upcomingSessions = sessions.filter((s) => s.status === "CONFIRMED");
  const pastSessions = sessions.filter((s) => s.status === "COMPLETED");

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isAuthLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-1/4 mb-4" />
        <Skeleton className="h-8 w-1/2 mb-8" />
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your learning sessions and profile
          </p>
        </div>

        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Upcoming Sessions (Mock Data)</CardTitle>
                <CardDescription>
                  This data is mocked as the backend does not provide a session
                  history endpoint.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {/* SessionCard component would be used here */}
                  </div>
                ) : (
                  <p>No upcoming sessions.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Dialog open={profileEdit} onOpenChange={setProfileEdit}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleProfileUpdate}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            defaultValue={user.name}
                          />
                        </div>
                        <div>
                          <Label htmlFor="headline">Headline</Label>
                          <Input
                            id="headline"
                            name="headline"
                            defaultValue={user.headline}
                          />
                        </div>
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            defaultValue={user.bio}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={updateProfileMutation.isPending}
                        >
                          {updateProfileMutation.isPending
                            ? "Saving..."
                            : "Save Changes"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground mt-1">{user.email}</p>
                    <p className="mt-4">{user.headline}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {user.bio}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Skills You Teach</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {isTransactionsLoading && <p>Loading transactions...</p>}
                {transactionsError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Could not load transaction history.
                    </AlertDescription>
                  </Alert>
                )}
                {transactions && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>
                            {new Date(tx.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                tx.type === "EARNED" ? "default" : "destructive"
                              }
                            >
                              {tx.type}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className={`font-medium ${
                              tx.amount > 0
                                ? "text-success"
                                : "text-destructive"
                            }`}
                          >
                            {tx.amount.toFixed(2)} Credits
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
