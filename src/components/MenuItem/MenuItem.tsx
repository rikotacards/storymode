import { Typography, MenuItem as M, ListItemText } from "@mui/material";
import React from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/router";
import Link from "next/link";
interface MenuItemProps {
  path: string;
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
}
export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { path, name, icon , onClick} = props;
  const router = useRouter();
  const p = usePathname();
  return (
    <M selected={p === path}>
      <Link
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 24px 12px 14px",
          width: '100%',
        }}
        href={path}
        as={path}
        // onClick={onClick ? onClick : () => {router.push(path)}}
      >
        <div style={{ marginRight: "16px", display: 'flex', alignItems: 'center' }}>{icon}</div>
        <ListItemText>
            <Typography>{name}</Typography>
        </ListItemText>
      </Link>
    </M>
  );
};
