import { protectedRoutes, publicRoutes } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/clientApp";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { SignInNewUser } from "../SignInNewUser/SignInNewUser";
interface RouteGuardProps {
  children: React.ReactNode;
}
export const RouteGuard: React.FC<RouteGuardProps> = (props) => {
  const {children} = props;
  const {isLoading, isLoggedIn, user} = useAuth();
  const router = useRouter();
  const isProtectedPath = protectedRoutes[router.pathname] !== undefined
  React.useEffect(() => {
    console.log('in effect', isLoading, isLoggedIn)
    if(!isLoading && !isLoggedIn && isProtectedPath){
      router.push('/signin')
    }
  }, [isLoading, isLoggedIn, isProtectedPath])
  
  if((isLoading || !isLoggedIn) && isProtectedPath){
    console.log('were here', isLoading, isLoggedIn)
    return (
      <LinearProgress sx={{width: '100%'}}/>
    )
  } 

  return <div>{children}</div>;
};
