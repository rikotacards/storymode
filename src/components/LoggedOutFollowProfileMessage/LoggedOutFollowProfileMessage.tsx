import React from "react";

import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export const LoggedOutFollowProfileMessage: React.FC = () => {
  const route = useRouter();
  const username = route.asPath.replace("/", "");
  
  return (
    <div style={{textAlign: 'center'}}>
      <div>
        <Typography variant='h6' fontWeight={"bold"}>Follow {username || ""}</Typography>
      </div>
      <div>
        <Typography variant='body1'>
          See more photos and stories from people that matter to you.
        </Typography>
      </div>
    </div>
  );
};
