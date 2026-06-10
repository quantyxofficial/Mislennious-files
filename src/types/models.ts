export type UserRole = 'admin' | 'mentor' | 'student';

export interface User {
  id: string; // UUID
  name: string;
  role: UserRole;
  email: string;
  created_at: string;
}

export interface Project {
  id: string; // UUID
  name: string;
  description: string | null;
  mentor_id: string | null;
  created_at: string;
}

export interface Assignment {
  id: string; // UUID
  student_id: string;
  project_id: string;
  created_at: string;
}

export interface Score {
  id: string; // UUID
  student_id: string;
  project_id: string;
  mentor_id: string | null;
  marks: number;
  feedback: string | null;
  created_at: string;
  updated_at: string;
}

// Extended types for UI joins (Dashboard Service)
export interface AssignedStudent extends User {
  score?: Score;
}

export interface ProjectWithDetails extends Project {
  mentor?: User;
  assignments?: {
    student_id: string;
    users: User;
  }[];
  scores?: Score[];
}

// Leaderboard specific type
export interface LeaderboardEntry {
  student_id: string;
  name: string;
  total_marks: number;
  projects_contributed: number;
  rank: number;
}
