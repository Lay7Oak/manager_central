
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../Persistence/DataContext';
import styles from './style';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const { appData, setAppData } = useContext(DataContext);  
  const [email, setEmail] = useState(appData?.user?.email || ''); 

  const registeredEmails = ['user@example.com', 'admin@example.com'];

  
  const handlePasswordRecovery = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

  
    if (registeredEmails.includes(email)) {
      
      Alert.alert(
        'Atenção ⚠',
        'Por ser uma versão de teste, você não receberá um e-mail para recuperação de senha. Por favor, entre em contato com o responsável pelo teste para resetar sua senha.'
        // 'Verifique a caixa de entrada. Caso não tenha recebido as instruções, verifique a caixa de Spam ou confirme se o email está correto. Se necessário, clique em "Ajuda".'
      );

      
      setAppData({ ...appData, recoveryEmail: email });
    } else {
      
      Alert.alert(
      'Atenção ⚠',
        // 'Verifique a caixa de entrada. Caso não tenha recebido as instruções, verifique a caixa de Spam ou confirme se o email está correto. Se necessário, clique em "Ajuda".'
        'Por ser uma versão de teste, você não receberá um e-mail para recuperação de senha. Por favor, entre em contato com o responsável pelo teste para resetar sua senha.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Digite o Email Cadastrado</Text>
      </View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#808080"
          style={styles.input}
          value={email}
          onChangeText={setEmail}  
        />

        <Text style={styles.information}>
          Se o e-mail informado estiver cadastrado em nosso sistema, você receberá
          instruções para recuperar sua senha.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery}>
          <Text style={styles.buttonText}>Enviar</Text>
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
}