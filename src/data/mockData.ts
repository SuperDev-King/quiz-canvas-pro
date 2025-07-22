import { Form, Response, Template, Creator, DashboardStats } from '@/types';

export const mockCreators: Creator[] = [
  {
    id: 'creator-1',
    email: 'john@survey.com',
    name: 'John Creator',
    role: 'creator',
    createdAt: '2024-01-15',
    isActive: true,
    totalForms: 5,
    totalResponses: 847,
    avgCompletionRate: 78,
  },
  {
    id: 'creator-2',
    email: 'sarah@survey.com',
    name: 'Sarah Designer',
    role: 'creator',
    createdAt: '2024-02-01',
    isActive: true,
    totalForms: 3,
    totalResponses: 312,
    avgCompletionRate: 65,
  },
  {
    id: 'creator-3',
    email: 'mike@survey.com',
    name: 'Mike Analytics',
    role: 'creator',
    createdAt: '2024-01-20',
    isActive: false,
    totalForms: 8,
    totalResponses: 1203,
    avgCompletionRate: 82,
  },
];

export const mockForms: Form[] = [
  {
    id: 'form-1',
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our service by sharing your feedback',
    type: 'survey',
    creatorId: 'creator-1',
    questions: [
      {
        id: 'q1',
        type: 'star-rating',
        title: 'How would you rate our service?',
        required: true,
        minValue: 1,
        maxValue: 5,
        order: 1,
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        title: 'How did you hear about us?',
        required: true,
        options: [
          { id: 'opt1', text: 'Social Media' },
          { id: 'opt2', text: 'Friend Referral' },
          { id: 'opt3', text: 'Search Engine' },
          { id: 'opt4', text: 'Advertisement' },
        ],
        order: 2,
      },
      {
        id: 'q3',
        type: 'long-answer',
        title: 'Any additional feedback?',
        required: false,
        order: 3,
      },
    ],
    isActive: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-25',
    responses: 247,
    completionRate: 80,
    avgResponseTime: 3.5,
  },
  {
    id: 'form-2',
    title: 'Product Knowledge Quiz',
    description: 'Test your knowledge about our products',
    type: 'quiz',
    creatorId: 'creator-1',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        title: 'What is our flagship product?',
        required: true,
        options: [
          { id: 'opt1', text: 'Product A', isCorrect: true },
          { id: 'opt2', text: 'Product B' },
          { id: 'opt3', text: 'Product C' },
        ],
        correctAnswer: 'opt1',
        order: 1,
      },
      {
        id: 'q2',
        type: 'number',
        title: 'How many years have we been in business?',
        required: true,
        correctAnswer: '15',
        order: 2,
      },
    ],
    isActive: true,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-05',
    responses: 123,
    completionRate: 67,
    avgResponseTime: 2.8,
  },
];

export const mockResponses: Response[] = [
  {
    id: 'resp-1',
    formId: 'form-1',
    respondentId: 'resp-user-1',
    answers: {
      q1: 4,
      q2: 'Friend Referral',
      q3: 'Great service, keep it up!',
    },
    completedAt: '2024-01-25T10:30:00Z',
    country: 'United States',
    completionTime: 180,
    isCompleted: true,
  },
  {
    id: 'resp-2',
    formId: 'form-1',
    respondentId: 'resp-user-2',
    answers: {
      q1: 5,
      q2: 'Social Media',
    },
    completedAt: '2024-01-25T14:45:00Z',
    country: 'Canada',
    completionTime: 90,
    isCompleted: false,
  },
];

export const mockTemplates: Template[] = [
  {
    id: 'template-1',
    name: 'Customer Feedback Survey',
    category: 'customer-feedback',
    description: 'Collect customer satisfaction and feedback data',
    preview: 'Rate our service, share your experience, and help us improve',
    questions: [
      {
        type: 'star-rating',
        title: 'Overall satisfaction with our service',
        required: true,
        minValue: 1,
        maxValue: 5,
        order: 1,
      },
      {
        type: 'multiple-choice',
        title: 'How likely are you to recommend us?',
        required: true,
        options: [
          { id: 'opt1', text: 'Very Likely' },
          { id: 'opt2', text: 'Likely' },
          { id: 'opt3', text: 'Neutral' },
          { id: 'opt4', text: 'Unlikely' },
          { id: 'opt5', text: 'Very Unlikely' },
        ],
        order: 2,
      },
      {
        type: 'long-answer',
        title: 'What can we improve?',
        required: false,
        order: 3,
      },
    ],
  },
  {
    id: 'template-2',
    name: 'School Assessment Quiz',
    category: 'school-use',
    description: 'Educational quiz template for schools and universities',
    preview: 'Test student knowledge with multiple choice and short answer questions',
    questions: [
      {
        type: 'multiple-choice',
        title: 'Sample Question 1',
        required: true,
        options: [
          { id: 'opt1', text: 'Option A' },
          { id: 'opt2', text: 'Option B' },
          { id: 'opt3', text: 'Option C' },
          { id: 'opt4', text: 'Option D' },
        ],
        order: 1,
      },
      {
        type: 'short-answer',
        title: 'Sample Short Answer Question',
        required: true,
        order: 2,
      },
    ],
  },
];

export const mockDashboardStats: DashboardStats = {
  totalForms: 16,
  totalResponses: 1582,
  avgCompletionRate: 75,
  activeUsers: 12,
};

export const mockResponsesByDay = [
  { name: 'Monday', responses: 156, completion: 78 },
  { name: 'Tuesday', responses: 234, completion: 82 },
  { name: 'Wednesday', responses: 198, completion: 75 },
  { name: 'Thursday', responses: 287, completion: 88 },
  { name: 'Friday', responses: 167, completion: 71 },
  { name: 'Saturday', responses: 89, completion: 65 },
  { name: 'Sunday', responses: 123, completion: 69 },
];

export const mockResponsesByCountry = [
  { name: 'United States', value: 45, responses: 712 },
  { name: 'Canada', value: 15, responses: 237 },
  { name: 'United Kingdom', value: 12, responses: 190 },
  { name: 'Germany', value: 8, responses: 127 },
  { name: 'France', value: 6, responses: 95 },
  { name: 'Others', value: 14, responses: 221 },
];

export const mockSessionData = [
  { hour: '06', session: 45, conversion: 12 },
  { hour: '07', session: 89, conversion: 23 },
  { hour: '08', session: 156, conversion: 45 },
  { hour: '09', session: 234, conversion: 67 },
  { hour: '10', session: 198, conversion: 78 },
  { hour: '11', session: 287, conversion: 89 },
  { hour: '12', session: 167, conversion: 56 },
  { hour: '13', session: 198, conversion: 71 },
  { hour: '14', session: 234, conversion: 82 },
  { hour: '15', session: 189, conversion: 65 },
  { hour: '16', session: 156, conversion: 58 },
  { hour: '17', session: 123, conversion: 42 },
];