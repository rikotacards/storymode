import React from 'react';
export const useDoubleClick = (div: HTMLDivElement | null | undefined) => {
  const [open, setOpen] = React.useState(false);
  const [timer, setTimer] = React.useState<NodeJS.Timeout| null>();
  const handleDoubleClick = React.useCallback(() => {
    setOpen(true)
    console.log('DOUBLECLICK FIRED')
    if(timer){
      console.log('exist already', timer)
    }
    const timerId = setTimeout(() => {setOpen(false)}, 3000)

    console.log('timerId', timerId)
    setTimer(timerId)
  },[timer])
  const cancelTimeout = () => {
    if(!timer){
      return;
    }
    console.log('cealring', timer)
    clearTimeout(timer)
  }
  const close = () => {
    setOpen(false);
  }

  React.useEffect(() => {
    console.log('IN USEEFFECT')
    if(!div){
      console.log('mope', div)

      return;
    }
    div.addEventListener('dblclick', handleDoubleClick)
    return () => {
      div.removeEventListener('dblclick',handleDoubleClick)
    }
  }, [div, handleDoubleClick])
  
  return {
    visible: open,
    close,
    cancelTimeout
  }
}