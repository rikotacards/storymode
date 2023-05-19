import { Typography } from "@mui/material";

export const LoggedOutProfileMessage: React.FC = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <div>
        <Typography variant='h6' fontWeight={'bold'}>Express Yourself</Typography>
      </div>
      <div>You're the main character. Share your memories and stories to people that matter.</div>
    </div>
  );
};