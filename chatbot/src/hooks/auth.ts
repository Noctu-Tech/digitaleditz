"use client"
import { useQuery } from '@tanstack/react-query';

import { UserRole } from '../types/auth';
import apiClientNew from '@/lib/functionapis/apiclientnew';

// Add this constant at the top level
const isDev = false

// React Query keys
export const authKeys = {
  user: ['user'],
  profile: (userId: string) => [...authKeys.user, userId],
};

// Auth hook for login, logout, and current user
export const useAuth = () => {

  // Get current user query
  const { data: user } = useQuery({
    queryKey: authKeys.user,
    queryFn: async()=>{
      try{
        const response=await apiClientNew.get('/user/me')
        return response.data
      }
      catch(e){
        console.error("error get profile::",e)
      }
    },
    retry: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

 
  // Modified permission checking with dev mode
  const isSelf= (id:string)=>{
    console.log(id,user._id)
    if (id===user._id) return true;
  }
  const hasPermission = (requiredRoles: UserRole[]) => {
    if (isDev) return true; // In development mode, grant all permissions
    if (!user) return false;
    console.log(user)
    if (user.u_role.includes('admin')) return true; // Admin has all permissions
    return requiredRoles.some(role => user.u_role.includes(role));
  };
  const isActivated = () => {
    if (isDev) return true; // In development mode, grant all permissions
    if (!user && !(user?.u_status==='DEACTIVATED')) return false;
    if(user?.u_status==='ACTIVATED') return true;
  }
  const isVerified = () => {
    if (isDev) return true; // In development mode, grant all permissions
    if (!user && !(user?.u_verified==='UNVERIFIED')) return false;
    if(user?.u_verified==='VERIFIED') return true;
  }

  return {
    user,
    isAuthenticated: isDev ? true : !!user,
    hasPermission,
    isActivated,
    isVerified,
    isSelf
  };
};