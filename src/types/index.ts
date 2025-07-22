export type UserRole = 'admin' | 'creator' | 'respondent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  isActive: boolean;
}

export interface Creator extends User {
  role: 'creator';
  totalForms: number;
  totalResponses: number;
  avgCompletionRate: number;
}

export type QuestionType = 
  | 'short-answer'
  | 'long-answer'
  | 'email'
  | 'number'
  | 'multiple-choice'
  | 'checkbox'
  | 'dropdown'
  | 'linear-scale'
  | 'star-rating'
  | 'smiley-faces';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  options?: QuestionOption[];
  minValue?: number;
  maxValue?: number;
  correctAnswer?: string;
  order: number;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  type: 'survey' | 'quiz';
  creatorId: string;
  questions: Question[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  responses: number;
  completionRate: number;
  avgResponseTime: number;
  customization?: {
    logo?: string;
    theme?: string;
    backgroundColor?: string;
  };
}

export interface Response {
  id: string;
  formId: string;
  respondentId: string;
  answers: Record<string, any>;
  completedAt: string;
  country: string;
  completionTime: number;
  isCompleted: boolean;
}

export interface DashboardStats {
  totalForms: number;
  totalResponses: number;
  avgCompletionRate: number;
  activeUsers: number;
}

export interface Template {
  id: string;
  name: string;
  category: 'customer-feedback' | 'school-use' | 'healthcare-use' | 'general-feedback';
  description: string;
  questions: Omit<Question, 'id'>[];
  preview: string;
}