import React, { createContext, useEffect, useState } from 'react';
import Storage from './storage';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({});

  // Carregar dados ao iniciar app
  useEffect(() => {
    const loadStoredData = async () => {
      const storedData = await Storage.getItem('appData');
      if (storedData) {
        setAppData(storedData);
      }
    };
    loadStoredData();
  }, []);

  // Atualizar armazenamento sempre que o estado mudar
  useEffect(() => {
    if (appData) {
      Storage.setItem('appData', appData);
    }
  }, [appData]);

  return (
    <DataContext.Provider value={{ appData, setAppData }}>
      {children}
    </DataContext.Provider>
  );
};
