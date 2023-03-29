import { TextField } from '@mui/material'
import React from 'react'

export const SearchContainer: React.FC = () => {
  const [text, setText] = React.useState("")
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  return (
      <TextField fullWidth onChange={onChange} value={text} variant='outlined' placeholder={'Search'}/>

  )
}