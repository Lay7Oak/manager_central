import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../Persistence/DataContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style.js';

const Login = () => {
  const navigation = useNavigation();
  const { appData, setAppData } = useContext(DataContext);
  const [gereEmail, setGereEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  

  
  const handleLogin = async () => {
    if (gereEmail === '' || senha === '') {
      Alert.alert('Erro', 'Por favor, insira o e-mail e a senha.');
      return;
    }

    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(gereEmail)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    setIsLoading(true); 

    try {
      await signInWithEmailAndPassword(auth, gereEmail, senha);

      const userData = { email: gereEmail };
      setAppData({ ...appData, user: userData });

      navigation.navigate('MainPage');
    } catch (error) {
      let mensagem;
      switch (error.code) {
        case 'auth/invalid-email':
          mensagem = 'O email informado não é válido.';
          break;
        case 'auth/wrong-password':
          mensagem = 'Senha incorreta. Por favor, tente novamente.';
          break;
        case 'auth/user-not-found':
          mensagem = 'Usuário não encontrado. Verifique o email informado.';
          break;
        default:
          mensagem = 'Verifique seu e-mail ou senha e tente novamente.';
      }

      Alert.alert('Ops!', mensagem);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Olá,</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader2}>
        <Text style={styles.message}>Bem-Vindo(a) à Central do Gerenciador!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#808080"
          style={styles.input}
          value={gereEmail}
          onChangeText={setGereEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { width: '85%' }]}
            placeholder="Senha"
            placeholderTextColor="#808080"
            secureTextEntry={!showSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setShowSenha(!showSenha)}>
            <Icon
              name={showSenha ? 'unlock' : 'lock'}
              size={20}
              color="#919191"
              style={[{ marginRight: 15, marginTop: 50 }]}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.esqueceText}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.registerText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.5 }]} 
          onPress={handleLogin}
          disabled={isLoading} 
        >
          <Text style={styles.buttonText}>{isLoading ? 'Carregando...' : 'Acessar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se!</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.ajuda}
            onPress={() => navigation.navigate('HelpPage')}
          >
            <Text style={styles.ajudaText}>Preciso de Ajuda</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonRegister} 
            onPress={() => navigation.navigate('TermsAndPolicy')}   
            >
            <Text style={styles.registerText}>Termos de Uso e Política de Privacidade</Text>
          </TouchableOpacity>

      </Animatable.View>
    </View>
  );
};

export default Login;
