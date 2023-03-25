import React from "react";
import { MenuItem } from "../MenuItem/MenuItem";
import styles from './SideMenu.module.css'
const menuItems = [
  { name: "Add Post", path: "/add-post" },
  { name: "Drafts", path: "/drafts" },
  { name: "Home", path: "/" },
  { name: "Profile", path: "/max" },
  { name: "Explore", path: "/explore" },
];

export const SideMenu: React.FC = () => {
  return (
    <div className={styles.sidemenu}>
      {menuItems.map((item) => (
        <MenuItem key={item.name} name={item.name} path={item.path} />
      ))}
    </div>
  );
};
