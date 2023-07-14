import { Typography } from "@mui/material";

export const LoggedOutHomeMessage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: 'center',
        width: '100%'
      }}
    >
      <div>
        <Typography sx={{textShadow: '0px 0px 0px orange' }} variant='h6' fontWeight={"bold"}>Follow your friends</Typography>
      </div>
      <div>
        <Typography>
          See photos and stories that matter to you.
        </Typography>
      </div>
    </div>
  );
};
