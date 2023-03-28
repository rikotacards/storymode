import { protectedRoutes, publicRoutes } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
interface RouteGuardProps {
  children: React.ReactNode;
}
export const RouteGuard: React.FC<RouteGuardProps> = (props) => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  const router = useRouter();
  const { children } = props;
  const pathIsProtected = !!protectedRoutes[router.pathname];
  
  React.useEffect(() => {
    if (!isLoggedIn && pathIsProtected){
      console.log('not logged in, path is protected')
      router.push(publicRoutes.signin);
    } 
   
  }, [isLoggedIn, pathIsProtected, router]);
  
  if(!isLoggedIn && pathIsProtected){
    return <LinearProgress/>
  }

  return <div>{children}</div>;
};
