// src/types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  bio?: string;
  headline?: string;
  skillsOffered: string[];
  avgRating: number;
  credits?: number; // Added for frontend convenience
}

export interface Peer extends User {
  totalReviews: number;
  hourlyRate: number;
  isOnline?: boolean;
}

export interface Transaction {
    id: string;
    type: "EARNED" | "SPENT" | "PURCHASED" | "REFUND";
    amount: number;
    description: string;
    date: string;
}