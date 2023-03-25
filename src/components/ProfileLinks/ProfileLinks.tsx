import { Button } from "@mui/material";
import React from "react";

const links = [
  { url: "#", name: "schedule" },
  { url: "#", name: "book something" },
  { url: "#", name: "Porfolio" },
  { url: "#", name: "movies" },
  { url: "#", name: "payme" },
];



export const ProfileLinks: React.FC = () => {
  return (
    <div>
      {links.map((link) => (
        <Button size='small' sx={{marginRight: 1}} variant='outlined' target={'_blank'} href={link.url}>{link.name}</Button>
      ))}
    </div>
  );
};
