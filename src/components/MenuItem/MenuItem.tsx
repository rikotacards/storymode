import { Typography, MenuItem as M, ListItemText } from "@mui/material";
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation';
interface MenuItemProps {
  path: string;
  name: string;
  icon: React.ReactNode;
}
export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { path, name, icon } = props;
  const p = usePathname();
  return (
    <M selected={p === path}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 24px 12px 14px",
        }}
      >
        <div style={{ marginRight: "16px" }}>{icon}</div>
        <ListItemText>
          <Link
            href={path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography>{name}</Typography>
          </Link>
        </ListItemText>
      </div>
    </M>
  );
};
