
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'; // Importação para gradiente
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Gradiente aplicado */}
      <LinearGradient
        colors={['#8b0045', '#cb4f57', '#f0ad4e']} // Cores do gradiente
        style={styles.gradientBackground}
      >
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation="flipInY"
            source={require('../../assets/Logo.png')}
            style={{ width: '100%' }}
            resizeMode="contain"
          />
        </View>

        <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Gerencie Seu Negócio de Onde Estiver!</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  containerLogo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    color: '#919191',
    marginTop: 13,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#8b0045',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

