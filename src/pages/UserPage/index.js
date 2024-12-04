
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../Persistence/DataContext'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function UserPage() {
  const { appData, setAppData } = useContext(DataContext); 
  const [nomeCompleto, setNomeCompleto] = useState(appData?.nomeCompleto || ''); 
  const [nomeNegocio, setNomeNegocio] = useState(appData?.businessName || ''); 
  const [email, setEmail] = useState(appData?.email || ''); 
  const [telefone, setTelefone] = useState(appData?.telefone || ''); 
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const navigation = useNavigation();  

 
  const handleSaveChanges = () => {
   
    setAppData((prev) => ({
      ...prev,
      nomeCompleto, 
      businessName: nomeNegocio, 
      email, 
      telefone, 
    }));
    Alert.alert('Dados alterados com sucesso!');
  };

  
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    
    Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  
  const handleCancelAccount = () => {
    Alert.alert(
      'Cancelar Conta',
      'As instruções para cancelar sua conta foram enviadas para o e-mail cadastrado.',
      [{ text: 'OK', style: 'default' }]
    );
  };
 return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#919191"
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome do Negócio</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Negócio"
              placeholderTextColor="#919191"
              value={nomeNegocio}
              onChangeText={setNomeNegocio}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#919191"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor="#919191"
              value={telefone}
              onChangeText={setTelefone}
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
              style={[styles.input, { width: '85%' }]}
                placeholder="Digite sua senha atual"
                placeholderTextColor="#919191"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Icon name={showCurrentPassword ? 'unlock' : 'lock'} size={20} color="#919191" style={{ marginRight: 10 }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nova Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { width: '85%' }]}
                placeholder="Digite sua nova senha"
                placeholderTextColor="#919191"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Icon name={showNewPassword ? 'unlock' : 'lock'} size={20} color="#919191" style={{ marginRight: 10 }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { width: '85%' }]}
                placeholder="Confirme sua nova senha"
                placeholderTextColor="#919191"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon name={showConfirmPassword ? 'unlock' : 'lock'} size={20} color="#919191" style={{ marginRight: 10 }} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
            <Text style={styles.buttonText}>Alterar Senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleCancelAccount}>
          <Text style={styles.cancelAccount}>Cancelar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.cancelAccount}>Sair</Text>
        </TouchableOpacity>

      </View>  
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b0045',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#919191',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#8b0045', 
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelAccount: {
    color: '#8b0045',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:2,

      },
});