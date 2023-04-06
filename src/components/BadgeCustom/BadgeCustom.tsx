import { Badge, BadgeProps } from '@mui/material';
import React from 'react';
import styles from './BadgeCustom.module.css'

export const BadgeCustom: React.FC<BadgeProps> = (props) => {
  return (
    <Badge className={styles.notificationDot} {...props}>
      {props.children}
    </Badge>
  )
}