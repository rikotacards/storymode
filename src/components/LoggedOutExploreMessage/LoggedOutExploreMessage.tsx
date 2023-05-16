import { Typography } from "@mui/material";

export const LoggedOutExploreMessage: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Typography variant='h6' fontWeight={"bold"}>Discover something new</Typography>
      </div>
      <div>
        Explore your interests and get inspired by stories around the world
      </div>
    </div>
  );
};
