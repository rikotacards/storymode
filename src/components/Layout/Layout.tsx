import React from 'react';
import { SideMenu } from '../SideMenu/SideMenu';
import styles from './Layout.module.css'
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className={styles.main}>
      <div className={styles.layoutMenuDesktop}>

    <SideMenu/>
      </div>
    <main className={styles.mainColumn}>
      
      {children}
    </main>
    </div>
  )
}