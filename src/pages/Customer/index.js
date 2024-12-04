// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView, StatusBar } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { DataContext } from '../../Persistence/DataContext';


// export default function Customer() {
//   const { appData, setAppData } = useContext(DataContext);
//   const [clientes, setClientes] = useState(appData.clientes || []);
//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [telefone, setTelefone] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [editingIndex, setEditingIndex] = useState(null);

//   const validarEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const validarTelefone = (telefone) => {
//     const telefoneRegex = /^\(?\d{2}\)?\s?9?\s?\d{4}-\d{4}$/;
//     return telefoneRegex.test(telefone);
//   };

//   const formatarTelefone = (telefone) => {
//     telefone = telefone.replace(/\D/g, '');
//     if (telefone.length <= 2) {
//       return `(${telefone}`;
//     } else if (telefone.length <= 6) {
//       return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
//     } else if (telefone.length <= 10) {
//       return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 3)} ${telefone.slice(3, 7)}-${telefone.slice(7, 10)}`;
//     } else {
//       return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 3)} ${telefone.slice(3, 7)}-${telefone.slice(7, 11)}`;
//     }
//   };

//   const adicionarCliente = () => {
//     if (nome && email && telefone) {
//       if (!validarEmail(email)) {
//         Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
//         return;
//       }
//       if (!validarTelefone(telefone)) {
//         Alert.alert('Erro', 'Por favor, insira um telefone válido.');
//         return;
//       }

//       const telefoneFormatado = formatarTelefone(telefone);

//       const novoCliente = {
//         id: Date.now(),
//         nome,
//         email,
//         telefone: telefoneFormatado,
//       };

//       const novosClientes = [...clientes, novoCliente];
//       setClientes(novosClientes);
//       setAppData({ ...appData, clientes: novosClientes });

//       setNome('');
//       setEmail('');
//       setTelefone('');
//     } else {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos.');
//     }
//   };

//   const editarCliente = (index) => {
//     const cliente = clientes[index];
//     setNome(cliente.nome);
//     setEmail(cliente.email);
//     setTelefone(cliente.telefone);
//     setEditingIndex(index);
//   };

//   const salvarEdicao = () => {
//     if (nome && email && telefone) {
//       if (!validarEmail(email)) {
//         Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
//         return;
//       }
//       if (!validarTelefone(telefone)) {
//         Alert.alert('Erro', 'Por favor, insira um telefone válido.');
//         return;
//       }

//       const updatedClientes = [...clientes];
//       updatedClientes[editingIndex] = { ...updatedClientes[editingIndex], nome, email, telefone };
//       setClientes(updatedClientes);
//       setAppData({ ...appData, clientes: updatedClientes });

//       setNome('');
//       setEmail('');
//       setTelefone('');
//       setEditingIndex(null);
//     } else {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos.');
//     }
//   };

//   const excluirCliente = (index) => {
//     Alert.alert(
//       'Excluir Cliente',
//       'Tem certeza que deseja excluir este cliente?',
//       [
//         { text: 'Cancelar' },
//         { text: 'Sim', onPress: () => {
//           const updatedClientes = clientes.filter((_, i) => i !== index);
//           setClientes(updatedClientes);
//           setAppData({ ...appData, clientes: updatedClientes });
//         }} ,
//       ]
//     );
//   };

//   const limparLista = () => {
//     Alert.alert(
//       'Limpar Lista',
//       'Tem certeza que deseja limpar a lista de clientes? Os dados serão apagados da lista e mantidos apenas no PDF.',
//       [
//         { text: 'Cancelar' },
//         { 
//           text: 'Baixar PDF e Limpar', 
//           onPress: () => {
//             // Aqui você pode integrar a função para gerar o PDF
//             setClientes([]);
//             setAppData({ ...appData, clientes: [] });
//           }
//         },
//       ]
//     );
//   };

//   const ordenarClientes = () => {
//     const clientesOrdenados = [...clientes].sort((a, b) => a.nome.localeCompare(b.nome));
//     setClientes(clientesOrdenados);
//     setAppData({ ...appData, clientes: clientesOrdenados });
//   };

//   const filteredClientes = clientes.filter(cliente => 
//     cliente.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     cliente.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     cliente.telefone.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <ScrollView> 
//       <StatusBar backgroundColor="#CB4F57" barStyle="light-content" />
//       <View style={styles.container}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Pesquisar Cliente"
//             value={searchQuery}
//             onChangeText={text => setSearchQuery(text)} 
//           />
//           <TouchableOpacity style={styles.searchButton}>
//             <Icon name="search" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         <TextInput
//           placeholder="Nome"
//           value={nome}
//           onChangeText={setNome}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <TextInput
//           placeholder="Telefone"
//           value={telefone}
//           onChangeText={(text) => setTelefone(formatarTelefone(text))}
//           style={styles.input}
//           keyboardType="phone-pad"
//         />

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={adicionarCliente}>
//           <Text style={styles.buttonText}>
//             {editingIndex !== null ? 'Salvar Edição' : 'Adicionar Cliente'}
//           </Text>
//         </TouchableOpacity>
        
//           )}
//         </View>

//         <View style={styles.buttonContainer}>          
//           {clientes.length > 0 && (
//             <TouchableOpacity style={[styles.button, styles.mudarCor]} onPress={limparLista}>
//               <Text style={styles.buttonText}>Limpar Lista</Text>
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity style={[styles.button, styles.mudarCor]} onPress={ordenarClientes}>
//             <Text style={styles.buttonText}>Ordenar por Nome</Text>
//           </TouchableOpacity>
          
//         </View>

//         <FlatList
//           data={filteredClientes}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item, index }) => (
//             <View style={styles.cliente}>
//               <Text style={styles.clienteText}>{item.nome}</Text>
//               <Text style={styles.clienteText}>{item.email}</Text>
//               <Text style={styles.clienteText}>{item.telefone}</Text>
//               <View style={styles.buttonGroup}>
//                 <TouchableOpacity onPress={() => editarCliente(index)} style={styles.editButton}>
//                   <Text style={styles.editText}>Editar</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => excluirCliente(index)} style={styles.deleteButton}>
//                   <Text style={styles.deleteText}>Excluir</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f4f4f4',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   searchInput: {
//     height: 40,
//     width: '85%',
//     paddingLeft: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   searchButton: {
//     padding: 10,
//     backgroundColor: '#CB4F57',
//     borderRadius: 5,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//     borderRadius: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#CB4F57',
//     padding: 12,
//     borderRadius: 5,
//     width: '48%',
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize:18,
//   },

//   mudarCor:{
//     backgroundColor:'#D6747A',
//   },
  
//   cliente: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//     shadowColor: '#ccc',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 5,
//   },
//   clienteText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },

//   editButton: {
//     backgroundColor: '#f0ad4e',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 5,
//     marginTop: 15,
//   },

//   deleteButton: {
//     backgroundColor: '#d9534f',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 5,
//     marginTop: 15,
//   },
  
//   editText: {
//     color: '#fff',
//   },
//   deleteText: {
//     color: '#fff',
//   },
// });

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataContext } from '../../Persistence/DataContext';

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

      const novosClientes = [...clientes, novoCliente];
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
      'Tem certeza que deseja limpar a lista de clientes? Os dados serão apagados da lista e mantidos apenas no PDF.',
      [
        { text: 'Cancelar' },
        { 
          text: 'Baixar PDF e Limpar', 
          onPress: () => {
            // Aqui você pode integrar a função para gerar o PDF
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
          <Text style={styles.buttonText}>Ordenar por Nome</Text>
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
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirCliente(index)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    width: '85%',
    paddingLeft: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#CB4F57',
    borderRadius: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#CB4F57',
    padding: 12,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize:18,
  },

  mudarCor:{
    backgroundColor:'#D6747A',
  },
  
  cliente: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  clienteText: {
    fontSize: 16,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  editButton: {
    backgroundColor: '#f0ad4e',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 15,
  },

  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 15,
  },
  
  editText: {
    color: '#fff',
  },
  deleteText: {
    color: '#fff',
  },
});
