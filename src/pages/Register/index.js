import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { DataContext } from '../../Persistence/DataContext';
import { setDoc, doc } from 'firebase/firestore'; 
import { LinearGradient } from 'expo-linear-gradient';
import { auth, firestore, createUserWithEmailAndPassword } from '../../../firebaseConfig';
import styles from './style';

export default function Register() {
  const navigation = useNavigation();
  const { setAppData } = useContext(DataContext); 
  
  const [gereNomeCompleto, setGereNomeCompleto] = useState('');
  const [gereNomeNegocio, setGereNomeNegocio] = useState('');
  const [gereEmail, setGereEmail] = useState('');
  const [gereTelefone, setGereTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  
  const [showSenha, setShowSenha] = useState(false); 
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const validarEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validarTelefone = (telefone) => {
    const telefoneRegex = /^\(?\d{2}\)?\s?9?\s?\d{4}-\d{4}$/;
    return telefoneRegex.test(telefone);
  };

  const formatarTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, ''); 

    if (telefone.length <= 2) {
      return `(${telefone}`;
    } else if (telefone.length <= 6) {
      return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    } else if (telefone.length <= 10) {
      return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 3)} ${telefone.slice(3, 7)}-${telefone.slice(7, 10)}`;
    } else {
      return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 3)} ${telefone.slice(3, 7)}-${telefone.slice(7, 11)}`;
    }
  };

  const validarSenha = (senha) => {
    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return senhaRegex.test(senha);
  };
  
  const handleCadastro = () => {
    if (!isChecked) {
      Alert.alert('Ops!', 'Você precisa aceitar os termos de uso e a política de privacidade para continuar.');
      return;
    }
  
    if (!gereNomeCompleto || !gereNomeNegocio || !gereEmail || !gereTelefone || !senha || !confirmarSenha) {
      Alert.alert('Ops!', 'Por favor, preencha todos os campos.');
      return;
    }
  
    if (!validarEmail(gereEmail)) {
      Alert.alert('Ops!', 'Por favor, insira um e-mail válido.');
      return;
    }
  
    if (!validarTelefone(gereTelefone)) {
      Alert.alert('Ops!', 'Por favor, insira um telefone válido no formato (XX) 9XXXX-XXXX.');
      return;
    }
  
    if (senha !== confirmarSenha) {
      Alert.alert('Ops!', 'As senhas não coincidem.');
      return;
    }
  
    if (senha.length < 6) {
      Alert.alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
  
    if (!validarSenha(senha)) {
      Alert.alert(
        'A senha deve conter:',
        '\n- No mínimo, 6 dígitos\n- Letra maiúscula\n- Letra minúscula\n- Número\n- Caractere especial (@$!%*?&)'
      );
      return;
    }
  
    setIsLoading(true);
  
    createUserWithEmailAndPassword(auth, gereEmail, senha)
      .then((userCredential) => {
        const user = userCredential.user;
  
        const userRef = doc(firestore, 'users', user.uid);
  
        return setDoc(userRef, {
          nomeCompleto: gereNomeCompleto,
          nomeNegocio: gereNomeNegocio,
          email: gereEmail,
          telefone: formatarTelefone(gereTelefone),
        });
      })
      .then(() => {
        setAppData((prev) => ({
          ...prev,
          nomeCompleto: gereNomeCompleto,
          businessName: gereNomeNegocio,
          email: gereEmail,
          telefone: formatarTelefone(gereTelefone),
        }));
  
        setGereNomeCompleto('');
        setGereNomeNegocio('');
        setGereEmail('');
        setGereTelefone('');
        setSenha('');
        setConfirmarSenha('');
        setIsChecked(false);
  
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        Alert.alert('Não foi possível realizar o cadastro:', 'Verifique os dados fornecidos e tente novamente.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Animatable.Text animation="fadeInDown" delay={600} style={styles.message}>
            Falta pouco para trabalharmos juntos!
          </Animatable.Text>

          <Animatable.Text animation="fadeInDown" delay={500} style={styles.information}>
            Deixe-me te conhecer:
          </Animatable.Text>
        </View>

        <Animatable.View animation="fadeInUp" style={styles.container2}>
          <TextInput
            placeholder="Nome Completo"
            placeholderTextColor="#D9D9D9"
            style={styles.input}
            value={gereNomeCompleto}
            onChangeText={setGereNomeCompleto}
          />

          <TextInput
            placeholder="Nome do Negócio"
            placeholderTextColor="#D9D9D9"
            style={styles.input}
            value={gereNomeNegocio}
            onChangeText={setGereNomeNegocio}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#D9D9D9"
            style={styles.input}
            value={gereEmail}
            onChangeText={setGereEmail}
          />

          <TextInput
            placeholder="Telefone/Contato"
            placeholderTextColor="#D9D9D9"
            style={styles.input}
            value={gereTelefone}
            onChangeText={(text) => setGereTelefone(formatarTelefone(text))}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { width: '77%' }]}
              placeholder="Criar Senha"
              placeholderTextColor="#D9D9D9"
              secureTextEntry={!showSenha} 
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setShowSenha(!showSenha)}>
              <Icon
                name={showSenha ? 'unlock' : 'lock'}
                size={20}
                color="#D9D9D9"
                style={[{ marginRight: 37, marginBottom:42 }]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { width: '77%' }]}
              placeholder="Confirmar Senha"
              placeholderTextColor="#D9D9D9"
              secureTextEntry={!showConfirmarSenha}  
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}>
              <Icon
                name={showConfirmarSenha ? 'unlock' : 'lock'}
                size={20}
                color="#D9D9D9"
                style={[{ marginRight: 37, marginBottom:42 }]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxContainer}>
          <CheckBox
              style={{ flex: 1, padding: 10, margin:20, }}
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)}                      
              checkBoxColor="#D9D9D9"
            />
              <TouchableOpacity 
            style={styles.buttonRegister} 
            onPress={() => navigation.navigate('TermsAndPolicy')}   
            >
            <Text style={styles.registerText}>Termos de Uso e Política de Privacidade</Text>
          </TouchableOpacity>
          </View>

          <TouchableOpacity style= {[styles.button, isLoading && { opacity: 0.5 }]}
            onPress={handleCadastro}
            disabled={isLoading}
            >
            <Text style={styles.buttonText}>{isLoading ? 'Carregando...' : 'Cadastrar'}</Text>
          </TouchableOpacity>
        </Animatable.View>
       
      </View>
    </ScrollView>
  );
}
