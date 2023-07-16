import { protectedRoutes } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/router";
import React from "react";
import { LinearProgressCustom } from "../LinearProgressCustom/LinearProgressCustom";
interface RouteGuardProps {
  children: React.ReactNode;
}
export const RouteGuard: React.FC<RouteGuardProps> = (props) => {
  const {children} = props;
  const {isLoading, isLoggedIn, user} = useAuth();
  const router = useRouter();
  const isProtectedPath = protectedRoutes[router.pathname] !== undefined
  React.useEffect(() => {
    if(!isLoading && !isLoggedIn &&( isProtectedPath)){
      router.push('/')
    }
   
  }, [isLoading, isLoggedIn, isProtectedPath])

  
  if((isLoading)){
    return (
      <LinearProgressCustom/>
    )
  } 

  return <div>{children}</div>;
};
