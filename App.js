import React, { useState, useEffect } from 'react';
import { useFonts, Poppins_800ExtraBold_Italic } from '@expo-google-fonts/poppins';
import { PlayfairDisplay_400Regular_Italic } from '@expo-google-fonts/playfair-display';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DataProvider } from './src/Persistence/DataContext'; 
import { AuthProvider } from './src/Persistence/AuthContext';
import MyRoutes from './src/MyRoutes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_800ExtraBold_Italic,
    PlayfairDisplay_400Regular_Italic,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <AuthProvider>
      <DataProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="#990a17" barStyle="light-content" />
          <MyRoutes />
        </NavigationContainer>
      </DataProvider>
    </AuthProvider>
  );
}
