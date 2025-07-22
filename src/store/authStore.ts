import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@survey.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01',
    isActive: true,
  },
  {
    id: 'creator-1',
    email: 'creator@survey.com',
    name: 'John Creator',
    role: 'creator',
    createdAt: '2024-01-15',
    isActive: true,
  },
  {
    id: 'creator-2',
    email: 'creator2@survey.com',
    name: 'Sarah Designer',
    role: 'creator',
    createdAt: '2024-02-01',
    isActive: true,
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password123') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      register: async (email: string, password: string, name: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: `creator-${Date.now()}`,
          email,
          name,
          role: 'creator',
          createdAt: new Date().toISOString(),
          isActive: true,
        };
        
        mockUsers.push(newUser);
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);