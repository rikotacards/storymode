import React from 'react';

export const DialogContext = React.createContext({});
export const useDialogContext = () => React.useContext(DialogContext);

interface DialogContextProps {
  children: React.ReactNode;
}

export const DialogProvider: React.FC<DialogContextProps> = (props) => {
  const { children} = props;
  return (
    <DialogContext.Provider value={{}}>
      {children}
    </DialogContext.Provider>
  )
}