import React, { createContext, useEffect, useState, useContext } from 'react';
import SecureStorage from './secureStorage'; 
import { firestore, setDoc, doc, getDoc, query, collection, where, getDocs } from '../../firebaseConfig';
import { AuthContext } from './AuthContext'; 

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({});
  const { user } = useContext(AuthContext); 
  const userId = user?.uid;
  const userEmail = user?.email;

  useEffect(() => {
    const loadStoredData = async () => {
      if (userId) {
  
        const storedData = await SecureStorage.getItem('appData');
        if (storedData) {
          setAppData(storedData);
        }

        
        const docRef = doc(firestore, 'users', userId, 'appData', 'managerDocId');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAppData(docSnap.data());
          return;
        }

        
        if (userEmail) {
          const queryRef = query(
            collection(firestore, 'users'),
            where('email', '==', userEmail)
          );
          const querySnapshot = await getDocs(queryRef);

          if (!querySnapshot.empty) {
            const fallbackDoc = querySnapshot.docs[0].data();
            setAppData(fallbackDoc.appData || {});
            return;
          }
        }

        console.warn('Nenhum dado encontrado para este usuário.');
      }
    };

    loadStoredData();
  }, [userId, userEmail]);

  useEffect(() => {
    if (userId && appData) {
      SecureStorage.setItem('appData', JSON.stringify(appData));
      const docRef = doc(firestore, 'users', userId, 'appData', 'managerDocId');
      setDoc(docRef, { ...appData, email: userEmail });
    }
  }, [appData, userId, userEmail]);

  return (
    <DataContext.Provider value={{ appData, setAppData }}>
      {children}
    </DataContext.Provider>
  );
};