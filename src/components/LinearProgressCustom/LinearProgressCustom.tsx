import { LinearProgress } from '@mui/material';
import React from 'react';
import styles from './LinearProgressCustom.module.css'

export const LinearProgressCustom = () => {
  return <LinearProgress className={styles.progressBar} sx={{width: '100%'}}/>
}