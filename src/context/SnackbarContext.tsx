import React from 'react';

const SnackbarContext = React.createContext({})
export const useSnackbarContext = () => React.useContext(SnackbarContext);

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({children}) => {
  
  
  const value = {

  }
  return (
    <SnackbarContext.Provider value = {value}>
      {children}
    </SnackbarContext.Provider>
  )
}