import { protectedRoutes, publicRoutes } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
interface RouteGuardProps {
  children: React.ReactNode;
}
export const RouteGuard: React.FC<RouteGuardProps> = (props) => {
  const { isLoggedIn, isLoading } = useAuth();
  console.log('isLoggedIn', isLoggedIn);
  const router = useRouter();
  const { children } = props;
  const pathIsProtected = !!protectedRoutes[router.pathname];
  
  React.useEffect(() => {
    if(!isLoading && isLoggedIn){
      return
    }
    if (!isLoggedIn && pathIsProtected){
      console.log('not logged in, path is protected')
      router.push(publicRoutes.signin);
    } 
   
  }, [isLoggedIn, pathIsProtected, router, isLoading]);
  

  if((isLoading || !isLoggedIn) && pathIsProtected){
    return <LinearProgress/>
  }

  return <div>{children}</div>;
};
