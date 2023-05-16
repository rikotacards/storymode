import { Typography } from "@mui/material";

export const LoggedOutProfileMessage: React.FC = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <div>
        <Typography variant='h6' fontWeight={'bold'}>Express yourself</Typography>
      </div>
      <div>Share photos and stories of things that matter to you</div>
    </div>
  );
};