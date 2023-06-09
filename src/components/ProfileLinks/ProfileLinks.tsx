import { Button } from "@mui/material";
import React from "react";

const links: {name: string, url: string}[] = [

];



export const ProfileLinks: React.FC = () => {
  return (
    <div style={{display: 'flex', width: '100%', flexWrap:'wrap'}}>
      {links.map((link) => (
        <Button key={link.name + link.url} size='small' sx={{marginRight: 1, marginBottom:1}} variant='outlined' target={'_blank'} href={link.url}>{link.name}</Button>
      ))}
    </div>
  );
};
