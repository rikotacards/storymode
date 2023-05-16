import React from 'react';

import { Typography } from "@mui/material";

export const LoggedOutNotificationsMessageCard: React.FC = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <div>
        <Typography  variant='h6' fontWeight={'bold'}>See your friends react and engage</Typography>
      </div>
      <div>See photos and stories of things and people that matter to you</div>
    </div>
  );
};