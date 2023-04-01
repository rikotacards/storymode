import { ChevronLeft } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React from "react";
interface PageWrapperProps {
  children: React.ReactNode;
}
export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const route = useRoute();
  
  return (
    <div>
      <div>
        <div>
          <IconButton>
            <ChevronLeft />
          </IconButton>
        </div>
        <div>
          <Typography>Page name</Typography>
        </div>
      </div>
      {children}
    </div>
  );
};
function useRoute() {
  throw new Error("Function not implemented.");
}

