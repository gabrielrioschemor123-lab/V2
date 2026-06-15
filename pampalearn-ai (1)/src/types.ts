export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  purchased_courses: string[]; // courseIds that the user owns
  access_total?: boolean;
}

export interface AppUser {
  uid: string;
  displayName: string;
  email: string | null;
}

export interface Book {
  id: string;
  title: string;
  coverUrl?: string;
  cover_url?: string;
  download_url?: string;
  driveId: string;
  description: string;
  category: string;
  author: string;
  pages?: number;
}

export interface Lesson {
  id: string;
  title: string;
  order: number;
  video_drive_url: string;
  type: "video" | "pdf";
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: "Oficios" | "Fitness" | "Marketing Digital / Ventas" | "Música / DJing" | "Mecánica" | "Idiomas";
  total_lessons: number;
  isFree?: boolean;
  syllabus: Module[];
  headline: string;
  instructor: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp: Date;
}
