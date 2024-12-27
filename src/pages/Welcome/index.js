import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../Styles/globalStyles';
import styles from './style';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
 
      <LinearGradient
        colors={['#990a17', '#990a17', '#990a17', '#990a17']}
        style={styles.gradientBackground}
      >
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation="flipInY"
            source={require('../../myLogo/vermelhoMLogo.png')}
            style={{ width: '100%' }}
            resizeMode="contain"
          />
        </View>
        

        <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
          <Text style={[styles.title, globalStyles.text]}>Gerencie Seu Negócio de Onde Estiver!</Text>
          <Text style={styles.text}>Faça o login para começar!</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
}
