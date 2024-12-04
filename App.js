
import React from 'react';
import { DataProvider } from './src/Persistence/DataContext'; 
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyRoutes from './src/MyRoutes';


export default function App() {
  return (
    <DataProvider> 
      <NavigationContainer>
        <StatusBar backgroundColor="#8b0045" barStyle="light-content" />
        <MyRoutes />
      </NavigationContainer>
    </DataProvider>
  );
}


