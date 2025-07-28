export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'voice';
  timestamp: Date;
  voiceUrl?: string;
  duration?: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
  enrolledCount: number;
  rating: number;
  category: string;
  image: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'quiz' | 'reading';
  content?: string;
  quiz?: Quiz;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  pathId: string;
  pathTitle: string;
  completionDate: Date;
  grade: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  joinDate: Date;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}