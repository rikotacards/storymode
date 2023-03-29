import * as React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}



export const TabPanel: React.FC<TabPanelProps> =(props: TabPanelProps)=> {
  const { children, value, index, ...other } = props;

  return (
    <div
    style={{width: '100%', display: 'flex', justifyContent: 'center'}}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}
