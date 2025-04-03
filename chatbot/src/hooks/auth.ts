"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { User, UserRole, AuthResponse } from '../types/auth';
import apiClient from '@/lib/api/apiclient';
import { useRouter } from 'next/navigation';

// Add this constant at the top level
const isDev = process.env.NODE_ENV === 'development';

// React Query keys
export const authKeys = {
  user: ['user'],
  profile: (userId: string) => [...authKeys.user, userId],
};

// Auth hook for login, logout, and current user
export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Get current user query
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: authKeys.user,
    queryFn: async () => {
      try {
        const { data } = await apiClient.get('/user/me');
        return data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

 
  // Modified permission checking with dev mode
  const hasPermission = (requiredRoles: UserRole[]) => {
    if (isDev) return true; // In development mode, grant all permissions
    if (!user) return false;
    if (user.roles.includes('admin')) return true; // Admin has all permissions
    return requiredRoles.some(role => user.roles.includes(role));
  };

  return {
    user,
    isAuthenticated: isDev ? true : !!user,
    isLoading,
    hasPermission,
  };
};