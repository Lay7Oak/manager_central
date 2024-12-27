//import * as FileSystem from 'expo-file-system';

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataContext } from '../../Persistence/DataContext';
import styles from './style';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

  export default function Customer() {
  const { appData, setAppData } = useContext(DataContext);
  const [clientes, setClientes] = useState(appData.clientes || []);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const validarEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
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

  const adicionarCliente = () => {
    if (nome && email && telefone) {
      if (!validarEmail(email)) {
        Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
        return;
      }
      if (!validarTelefone(telefone)) {
        Alert.alert('Erro', 'Por favor, insira um telefone válido.');
        return;
      }

      const telefoneFormatado = formatarTelefone(telefone);

      const novoCliente = {
        id: Date.now(),
        nome,
        email,
        telefone: telefoneFormatado,
      };

      const novosClientes = [novoCliente, ...clientes];
      setClientes(novosClientes);
      setAppData({ ...appData, clientes: novosClientes });

      setNome('');
      setEmail('');
      setTelefone('');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  const editarCliente = (index) => {
    const cliente = clientes[index];
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setEditingIndex(index);
  };

  const salvarEdicao = () => {
    if (nome && email && telefone) {
      if (!validarEmail(email)) {
        Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
        return;
      }
      if (!validarTelefone(telefone)) {
        Alert.alert('Erro', 'Por favor, insira um telefone válido.');
        return;
      }

      const updatedClientes = [...clientes];
      updatedClientes[editingIndex] = { ...updatedClientes[editingIndex], nome, email, telefone };
      setClientes(updatedClientes);
      setAppData({ ...appData, clientes: updatedClientes });

      setNome('');
      setEmail('');
      setTelefone('');
      setEditingIndex(null);
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  const excluirCliente = (index) => {
    Alert.alert(
      'Excluir Cliente',
      'Tem certeza que deseja excluir este cliente?',
      [
        { text: 'Cancelar' },
        { text: 'Sim', onPress: () => {
          const updatedClientes = clientes.filter((_, i) => i !== index);
          setClientes(updatedClientes);
          setAppData({ ...appData, clientes: updatedClientes });
        }} ,
      ]
    );
  };

  const limparLista = () => {
    Alert.alert(
      'Limpar Lista',
      'Tem certeza que deseja limpar a lista de clientes? Os dados serão apagados da lista e mantidos apenas no PDF. Por favor, escolha salvar ou compartilhar o PDF para garantir que os dados não sejam perdidos.',
      [
        { text: 'Cancelar' },
        { 
          text: 'Baixar PDF e Limpar', 
          onPress: async () => {
            await generatePDF();
            setClientes([]);
            setAppData({ ...appData, clientes: [] });
          }
        },
      ]
    );
  };
  

  const ordenarClientes = () => {
    const clientesOrdenados = [...clientes].sort((a, b) => a.nome.localeCompare(b.nome));
    setClientes(clientesOrdenados);
    setAppData({ ...appData, clientes: clientesOrdenados });
  };

  const generatePDF = async () => { 
    const htmlContent = `
      <html> 
        <body> 
          <h1>Lista de Clientes</h1>
          <ul> 
            ${clientes.map(cliente => ` 
              <li> 
                <strong>Nome:</strong> ${cliente.nome} <br />
                <strong>Email:</strong> ${cliente.email} <br /> 
                <strong>Telefone:</strong> ${cliente.telefone} <br /><br />
              </li> 
            `).join('')}
          </ul> 
        </body> 
      </html>
    `; 
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri);
  };

  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cliente.telefone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#CB4F57" barStyle="light-content" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar Cliente"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} 
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>Adicionar Clientes </Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(formatarTelefone(text))}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { width: '100%' }]}
          onPress={editingIndex !== null ? salvarEdicao : adicionarCliente}
        >
          <Text style={styles.buttonText}>
            {editingIndex !== null ? 'Salvar Edição' : 'Adicionar Cliente'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>          
        {clientes.length > 0 && (
          <TouchableOpacity style={[styles.button, styles.mudarCor]} onPress={limparLista}>
            <Text style={styles.buttonText}>Limpar Lista</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.mudarCor]} onPress={ordenarClientes}>
          <Text style={styles.buttonText}>Ordenar Nomes</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredClientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cliente}>
            <Text style={styles.clienteText}>{item.nome}</Text>
            <Text style={styles.clienteText}>{item.email}</Text>
            <Text style={styles.clienteText}>{item.telefone}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => editarCliente(index)} style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirCliente(index)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
