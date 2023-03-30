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
  const router = useRouter();
  const [authorized, setAuthorized] = React.useState(false);
  const isProtected = protectedRoutes[router.pathname] !== undefined;
  const { children } = props;

  React.useEffect(() => {
    if (!isLoggedIn) {
      if (isProtected) {
        router.push("/signin");
      }
      if (!isProtected) {
        setAuthorized(true);
      }
    }
    if (isLoggedIn) {
      setAuthorized(true);
    }
  }, [isLoggedIn]);

  if (!authorized) {
    return <LinearProgress style={{ width: "100%" }} />;
  }

  return <div>{authorized && children}</div>;
};
