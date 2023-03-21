import React from 'react';
import { SideMenu } from '../SideMenu/SideMenu';
import styles from './Layout.module.css'
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
    <SideMenu/>
    <main>
      {children}
    </main>
    </>
  )
}