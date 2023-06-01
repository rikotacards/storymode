import { useDrawerContext } from '@/context/DrawerContext';
import { Typography } from '@mui/material';
import React from 'react';

export const Comments: React.FC = () => {
  const drawerContext = useDrawerContext();
  React.useEffect(() => {
    drawerContext.setComponent('commentsDrawer')
  })
  const onClick = () => {
    drawerContext.onOpen()
  }
  return (
    <div onClick={onClick}>
      <Typography typography='body2'>View all 5 comments</Typography>
    </div>
  )
}