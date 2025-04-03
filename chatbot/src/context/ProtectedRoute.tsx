"use client"
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/auth';
import { UserRole } from '../types/auth';
import { ENV } from '@/lib/functions/config';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  isdev?: boolean;
}
const ProtectedRoute = ({ children, requiredRoles = [],isdev=ENV.ISDEV }: ProtectedRouteProps) => {

  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  const router = useRouter();
  if (isdev) {
    console.log(isdev)
    return <>{children}</>
  }

 
  
  else if (isLoading) {
    return <div>Loading...</div>;
  }

  else if (!isAuthenticated) {
    router.push('/signin');
    return null;
  }

  else if (requiredRoles.length > 0 && !hasPermission(requiredRoles)) {
    router.push('/unauthorized');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;