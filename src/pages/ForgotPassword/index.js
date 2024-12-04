
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { DataContext } from '../../Persistence/DataContext';  

export default function ForgotPassword() {
  const { appData, setAppData } = useContext(DataContext);  
  const [email, setEmail] = useState(appData?.user?.email || ''); 

  // Simulação de emails cadastrados (adicionar API)
  const registeredEmails = ['user@example.com', 'admin@example.com'];

  // Função para recuperação de senha
  const handlePasswordRecovery = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    // Verifica se o email está cadastrado
    if (registeredEmails.includes(email)) {
      // Simula o envio de um email de recuperação
      Alert.alert(
        'Atenção ⚠',
        'Verifique a caixa de entrada. Caso não tenha recebido as instruções, verifique a caixa de Spam ou confirme se o email está correto. Se necessário, clique em "Ajuda".'
      );

      // Armazenar o email inserido no contexto global
      setAppData({ ...appData, recoveryEmail: email });  // Armazena o email para futuras referências
    } else {
      // Simula o processo sem enviar nada, apenas com a mensagem genérica
      Alert.alert(
      'Atenção ⚠',
        'Verifique a caixa de entrada. Caso não tenha recebido as instruções, verifique a caixa de Spam ou confirme se o email está correto. Se necessário, clique em "Ajuda".'
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
          onChangeText={setEmail}  // Atualiza o email digitado
        />

        <Text style={styles.information}>
          Se o e-mail informado estiver cadastrado em nosso sistema, você receberá
          instruções para recuperar sua senha.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ajuda}>
            <Text style={styles.ajudaText}>Preciso de Ajuda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>Termos de Uso e Política de Privacidade</Text>
        </TouchableOpacity>

         
        
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    paddingStart: '1%',
    paddingEnd: '1%',
    backgroundColor: '#8b0045',
  },

  containerForm: {
    flex: 1,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: '15%',
    paddingStart: '5%',
    paddingEnd: '5%',
    
  },

  title: {
    marginTop: '10%',
    marginBottom: 50,
    fontSize: 23,
   
    color: '#ffff',
    textAlign: 'center',
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#8b0045',
    height: 40,
    marginBottom: 12,
    fontSize: 18,
    color: '#8b0045',
    textAlign: 'center',
  },

  information: {
    marginTop: 40,
    marginBottom: 50,
    fontSize: 20,
    color: '#808080',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#8b0045',
    paddingVertical: 9,
    marginTop: 41,
    marginBottom: 41,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '60%',
    alignSelf: 'center',
  },

  buttonText: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  ajuda:{
   marginTop: 40,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign:'center',
  
 },

 ajudaText:{
   color:'#919191',
   fontSize: 20,
   justifyContent: 'center',
  alignItems: 'center',
  textAlign:'center',
  
 },

  buttonRegister: {
    margin: 25,
    alignSelf: 'center',
  },
    registerText: {
    color: '#919191',
    fontSize: 15,
  },
});

