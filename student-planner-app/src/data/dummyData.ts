export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Assignment' | 'Exam' | 'Study' | 'Project';
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  taskCount: number;
}

export const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'Math Assignment',
    description: 'Complete calculus problems chapter 5',
    dueDate: '2026-05-15',
    priority: 'High',
    category: 'Assignment',
    completed: false,
  },
  {
    id: '2',
    title: 'SWE201 Final Project',
    description: 'Submit final documentation',
    dueDate: '2026-12-15',
    priority: 'High',
    category: 'Project',
    completed: false,
  },
  {
    id: '3',
    title: 'Study for Physics',
    description: 'Review chapters 1-4',
    dueDate: '2026-04-20',
    priority: 'Medium',
    category: 'Study',
    completed: true,
  },
  {
    id: '4',
    title: 'Database Quiz',
    description: 'SQL fundamentals',
    dueDate: '2026-05-20',
    priority: 'High',
    category: 'Exam',
    completed: false,
  },
  {
    id: '5',
    title: 'Read Research Papers',
    description: 'AI in education',
    dueDate: '2026-06-10',
    priority: 'Low',
    category: 'Study',
    completed: false,
  },
];

export const dummyCategories: Category[] = [
  {
    id: '1',
    name: 'Assignments',
    icon: 'document-text',
    color: '#1E88E5',
    taskCount: 8,
  },
  {
    id: '2',
    name: 'Exams',
    icon: 'school',
    color: '#F44336',
    taskCount: 3,
  },
  {
    id: '3',
    name: 'Study',
    icon: 'book',
    color: '#4CAF50',
    taskCount: 12,
  },
  {
    id: '4',
    name: 'Projects',
    icon: 'briefcase',
    color: '#FF9800',
    taskCount: 5,
  },
];