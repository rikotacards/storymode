import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
interface MenuItemProps {
  path: string;
  name: string;
}
export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { path, name } = props;
  return (
    <Link href={path}>
      <Typography>{name}</Typography>
    </Link>
  );
};
