import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../Persistence/DataContext'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import styles from './style';

  export default function UserPage() {
  const { appData, setAppData } = useContext(DataContext); 
  const [gereNomeCompleto, setGereNomeCompleto] = useState(appData?.nomeCompleto || ''); 
  const [gereNomeNegocio, setGereNomeNegocio] = useState(appData?.businessName || ''); 
  const [gereEmail, setGereEmail] = useState(appData?.email || ''); 
  const [gereTelefone, setGereTelefone] = useState(appData?.telefone || ''); 
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const navigation = useNavigation();  

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
      return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6, 10)}`;
    } else {
      return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 3)} ${telefone.slice(3, 7)}-${telefone.slice(7, 11)}`;
    }
  };

  const handleSaveChanges = () => {
    if (!validarEmail(gereEmail)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (!validarTelefone(gereTelefone)) {
      Alert.alert('Erro', 'Por favor, insira um telefone válido no formato (XX) XXXX-XXXX.');
      return;
    }

    setAppData((prev) => ({
      ...prev,
      nomeCompleto: gereNomeCompleto, 
      businessName: gereNomeNegocio, 
      email: gereEmail, 
      telefone: gereTelefone, 
    }));
    Alert.alert('Dados alterados com sucesso!');
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            Alert.alert('Sucesso', 'Senha alterada com sucesso!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          })
          .catch((error) => {
            Alert.alert('Erro', 'Erro ao alterar a senha: ' + error.message);
          });
      })
      .catch((error) => {
        Alert.alert('Erro', 'Erro ao reautenticar: ' + error.message);
      });
  };

  const handleCancelAccount = () => {
    Alert.alert(
      'Cancelar Conta',
       'Por ser uma versão de teste, você não receberá um e-mail de cancelamento. Por favor, entre em contato com o responsável pelo teste para cancelar a conta.',
      // 'As instruções para cancelar sua conta foram enviadas para o e-mail cadastrado.',
      [{ text: 'OK', style: 'default' }]
    );
  };

 return (
    <ScrollView>
      <View style={[{ padding: 10, margin: 10,}]}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#919191"
              value={gereNomeCompleto}
              onChangeText={setGereNomeCompleto}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome do Negócio</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Negócio"
              placeholderTextColor="#919191"
              value={gereNomeNegocio}
              onChangeText={setGereNomeNegocio}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#dcdcdc', }]}
              placeholder="Email"
              placeholderTextColor="#919191"
              value={gereEmail}
              onChangeText={setGereEmail}
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor="#919191"
              value={gereTelefone}
              onChangeText={(text) => setGereTelefone(formatarTelefone(text))}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Alterar Senha</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha Atual</Text>
            <View style={styles.passwordContainer}>
              <TextInput
              style={[styles.input, { width: '75%' }]}
                placeholder=""
                placeholderTextColor="#919191"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Icon name={showCurrentPassword ? 'unlock' : 'lock'} size={20} color="#919191" style={{ marginRight: 37, marginBottom:15, }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nova Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { width: '75%' }]}
                placeholder=""
                placeholderTextColor="#919191"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Icon name={showNewPassword ? 'unlock' : 'lock'} size={20} color="#919191" style={{ marginRight: 37, marginBottom:15, }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { width: '75%' }]}
                placeholder=""
                placeholderTextColor="#919191"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon name={showConfirmPassword ? 'unlock' : 'lock'} size={20} color="#919191" style={{ marginRight: 37, marginBottom:15, }} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
            <Text style={styles.buttonText}>Alterar Senha</Text>
          </TouchableOpacity>
        </View>

           <Text
             style={[styles.modalLink, styles.cancelAccount, { color: '#007BFF' }]}
              onPress={() => Linking.openURL('https://forms.gle/iiYJ9WzNv2Y7aoqF7')}
            >
              Enviar Feedback
            </Text>

        <TouchableOpacity onPress={handleCancelAccount}>
          <Text style={styles.cancelAccount}>Cancelar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.cancelAccount}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.buttonRegister} 
            onPress={() => navigation.navigate('TermsAndPolicy')}   
            >
            <Text style={styles.registerText}>Termos de Uso e Política de Privacidade</Text>
          </TouchableOpacity>

      </View>  
    </ScrollView>
  );
}
