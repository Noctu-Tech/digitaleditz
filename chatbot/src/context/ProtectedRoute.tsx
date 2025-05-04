"use client"
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hooks/auth';
import { UserRole } from '../types/auth';
import { ENV } from '@/lib/functionapis/config';
import VerificationPending from '@/components/verification-pending';
import { VerificationTimeline } from '@/components/verification-timeline';
import { handleSignout } from '@/lib/functions/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  isdev?: boolean;
}
const ProtectedRoute = ({ children, requiredRoles = [],isdev=ENV.ISDEV }: ProtectedRouteProps) => {

  const { isAuthenticated,isActivated, hasPermission } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  console.log(isActivated(),hasPermission)
  const isDashboard = pathname === '/dashboard' || pathname === '/dashboard/';
  const isPublic= pathname==='/settings/'||pathname==='/help/'
  import { useEffect } from 'react';
  import { useRouter } from 'next/router';
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        await handleSignout(); // should remove cookies & possibly call logout endpoint
        router.push('/signin');
      }
    };
  
    checkAuth();
  }, [isAuthenticated, router]);
  

  if (isdev) {
    console.log(isdev)
    return <>{children}</>
  }

 
 
  // else if (requiredRoles.length > 0 && !hasPermission(requiredRoles)) {
  //   router.push('/unauthorized');
  //   return null;
  // }
  else if (!isActivated()){
    if(isDashboard){
    return<><VerificationTimeline/></>}
    if(!isDashboard && !isPublic){
     
      return <><VerificationPending/></>;
    }
  }
  return <>{children}</>;
};

export default ProtectedRoute;