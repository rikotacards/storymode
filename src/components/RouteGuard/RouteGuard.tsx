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
  const [show, setShow] = React.useState(false);
  const route = useRouter();
  
  if(!auth.currentUser){
    return <SignInNewUser/>
  }
 

  return <div>{children}</div>;
};
