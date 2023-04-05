import React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import { IconButton, Tab, Tabs } from '@mui/material';
import styles from './ProfileButtons.module.css';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LinkIcon from '@mui/icons-material/Link';
interface ProfileButtonsProps {
  value: number;
  handleChange: (e: React.SyntheticEvent, newValue: number) => void;
}

export const  a11yProps=(index: number)=> {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export const ProfileButtons: React.FC<ProfileButtonsProps> = ({handleChange, value}) => {
  return (
    <div className={styles.container}>
      <Tabs
          value={value}
          className={styles.tabs}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab icon={<TableRowsIcon/>}  {...a11yProps(0)} />
          <Tab icon={<AppsIcon/>}  {...a11yProps(1)} />
          <Tab icon={<LinkIcon/>}  {...a11yProps(2)} />

        </Tabs>

    </div>
  )
}
  