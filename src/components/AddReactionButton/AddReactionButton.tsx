import { AddReaction } from '@mui/icons-material';
import { Button, Chip, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

export const AddReactionButton: React.FC = () => {
  return (
    // <Button variant='outlined' sx={{borderRadius:25, maxWidth: 1, paddingLeft: 0, paddingRight: 0}}>
    //   <AddReaction fontSize='small'/>
    // </Button>
      <Chip  variant='outlined' label={<div style={{display: 'flex'}}><AddReaction  fontSize='small' /></div>}clickable />

  )
}