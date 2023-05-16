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
      }}
    >
      <div>
        <Typography variant='h6' fontWeight={"bold"}>Follow your friends</Typography>
      </div>
      <div>
        <Typography>
          See photos and stories of things and people that matter to you
        </Typography>
      </div>
    </div>
  );
};
