import React from 'react';

export const ReactionsContext = React.createContext({})
export const useReactionsContext = () => React.useContext(ReactionsContext)

interface ReactionsProviderProps {
  children: React.ReactNode;
}

export const ReactionsProvider: React.FC<ReactionsProviderProps> = ({children}) => {

  

  const context = {}
  return <ReactionsContext.Provider value={context}>
    {children}
  </ReactionsContext.Provider>
}