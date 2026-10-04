export type JAMBSubject =
  | 'Use of English'
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Economics'
  | 'Government'
  | 'Literature'
  | 'CRS'
  | 'IRS'
  | 'CRK'
  | 'IRK'
  | 'Geography'
  | 'History'
  | 'Agricultural Science'
  | 'Agriculture'
  | 'Principles of Accounts'
  | 'Commerce'
  | 'Computer Studies'
  | 'Fine Art'
  | 'French'
  | 'Arabic'
  | 'Hausa'
  | 'Igbo'
  | 'Home Economics'
  | 'Literature Textbooks'
  | 'Music'
  | 'PHE'
  | 'The Lekki Headmaster'
  | 'Yoruba';

export enum ExamMode {
  EXAM = 'exam',
  PRACTICE = 'practice',
  STUDY = 'study'
}

export interface Question {
  id: string;
  subject: JAMBSubject;
  year: number;
  text: string;
  options: { A: string; B: string; C: string; D: string };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  topic?: string;
  imageUrl?: string;
  book?: string;
  chapter?: string;
}

export interface ExamSession {
  id: string;
  subjects: JAMBSubject[];
  mode: ExamMode;
  duration: number;
  startTime: number;
  questions: Record<JAMBSubject, Question[]>;
  answers: Record<string, 'A' | 'B' | 'C' | 'D' | null>;
  flags: string[];
  timeRemaining: number;
}

export interface UserStats {
  totalExams: number;
  averageScore: number;
  subjectPerformance: Record<JAMBSubject, number>;
  weakTopics: string[];
}
