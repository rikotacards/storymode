import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import styles from './ProfileActions.module.css';
export const ProfileActions: React.FC = () => {
  const [displayedFollow, setDisplayedFollow] = React.useState(false);
  const onFollowClick = () => {
    setDisplayedFollow(!displayedFollow)
  }
  return (
    <div className={styles.container}>
      <div style={{marginRight: '8px'}}>
        <Typography style={{fontWeight: '400', fontSize: 20}}>MichaelHsu95</Typography>
      </div>
      <div >
        <Button  onClick={onFollowClick} sx={{borderRadius: 5}} variant='contained'>
          {displayedFollow ? 'Unfollow' : 'Follow'}
          </Button>
      </div>
      <IconButton sx={{marginLeft: 'auto'}}>
          <MoreHorizIcon />
        </IconButton>
    </div>
  );
};
