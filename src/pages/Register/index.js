// import React, { useState, useContext } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { DataContext } from '../../Persistence/DataContext'; // Importando o contexto global
// import {useNavigation} from '@react-navigation/native'
// import Icon from 'react-native-vector-icons/FontAwesome'; // Importando ícones


// export default function Register() {

//  const navigation = useNavigation();

//   const { appData, setAppData } = useContext(DataContext); // Acessando o contexto global
//   const [nomeCompleto, setNomeCompleto] = useState('');
//   const [nomeNegocio, setNomeNegocio] = useState('');
//   const [email, setEmail] = useState('');
//   const [telefone, setTelefone] = useState('');
//   const [senha, setSenha] = useState('');
//   const [confirmarSenha, setConfirmarSenha] = useState('');

//   // Função para validar e-mail
//   const validarEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   // Função para validar telefone
//   const validarTelefone = (telefone) => {
//     const telefoneRegex = /^\(?\d{2}\)?\s?9?\s?\d{4}-\d{4}$/;
//     return telefoneRegex.test(telefone);
//   };

//   // Função para formatar o telefone no padrão (XX) 9XXXX-XXXX
//   const formatarTelefone = (telefone) => {
//     telefone = telefone.replace(/\D/g, ''); // Remove tudo que não for número

//      if (telefone.length <= 2) {
//       return `(${telefone}`;
//     } else if (telefone.length <= 6) {
//       return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
//     } else if (telefone.length <= 10) {
//       return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 3)} ${telefone.slice(3, 7)}-${telefone.slice(7, 10)}`;
//     } else {
//       return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 3)} ${telefone.slice(3, 7)}-${telefone.slice(7, 11)}`;
//     }
//   };

//   const handleCadastro = () => {
//   // Verificando se todos os campos estão preenchidos
//   if (!nomeCompleto || !nomeNegocio || !email || !telefone || !senha || !confirmarSenha) {
//     Alert.alert('Erro', 'Por favor, preencha todos os campos.');
//     return;
//   }

//   // Validando o e-mail
//   if (!validarEmail(email)) {
//     Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
//     return;
//   }

//   // Validando o telefone
//   if (!validarTelefone(telefone)) {
//     Alert.alert('Erro', 'Por favor, insira um telefone válido no formato (XX) 9XXXX-XXXX.');
//     return;
//   }

//   // Verificando se as senhas são iguais
//   if (senha !== confirmarSenha) {
//     Alert.alert('Erro', 'As senhas não coincidem.');
//     return;
//   }

//   // Atualizando o estado global diretamente com os valores fornecidos
//   setAppData((prev) => ({
//     ...prev,
//     nomeCompleto, // Nome do usuário
//     businessName: nomeNegocio, // Nome do negócio
//     email, // E-mail do usuário
//     telefone: formatarTelefone(telefone), // Telefone formatado
//   }));

//   // Limpando os campos após cadastro
//   setNomeCompleto('');
//   setNomeNegocio('');
//   setEmail('');
//   setTelefone('');
//   setSenha('');
//   setConfirmarSenha('');

//   Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
// };


//   return (
//   <ScrollView>
//     <View style={styles.container}>
//       <View>
//         <Animatable.Text animation="fadeInDown" delay={600} style={styles.message}>
//           Falta pouco para trabalharmos juntos!
//         </Animatable.Text>

//         <Animatable.Text animation="fadeInDown" delay={500} style={styles.information}>
//           Deixe-me te conhecer:
//         </Animatable.Text>
//       </View>

     
//         <Animatable.View animation="fadeInUp" style={styles.container2}>
//           <TextInput
//             placeholder="Nome Completo"
//             placeholderTextColor="#808080"
//             style={styles.input}
//             value={nomeCompleto}
//             onChangeText={setNomeCompleto}
//           />

//           <TextInput
//             placeholder="Nome do Negócio"
//             placeholderTextColor="#808080"
//             style={styles.input}
//             value={nomeNegocio}
//             onChangeText={setNomeNegocio}
//           />

//           <TextInput
//             placeholder="Email"
//             placeholderTextColor="#808080"
//             style={styles.input}
//             value={email}
//             onChangeText={setEmail}
//           />

//           <TextInput
//             placeholder="Telefone/Contato"
//             placeholderTextColor="#808080"
//             style={styles.input}
//             value={telefone}
//             onChangeText={(text) => setTelefone(formatarTelefone(text))}
//           />
//   <View style={styles.passwordContainer}>
//             <TextInput
//               style={[styles.input, { width: '85%' }]}
//               placeholder="Criar Senha"
//               placeholderTextColor="#808080"
//               secureTextEntry={!showSenha}  // Controla a visibilidade da senha
//               value={senha}
//               onChangeText={setSenha}
//             />
//             <TouchableOpacity onPress={() => setShowSenha(!showSenha)}>
//               <Icon
//                 name={showSenha ? 'unlock' : 'lock'}
//                 size={20}
//                 color="#919191"
//                 style={{ marginRight: 10 }}
//               />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={[styles.input, { width: '85%' }]}
//               placeholder="Confirmar Senha"
//               placeholderTextColor="#808080"
//               secureTextEntry={!showConfirmarSenha}  // Controla a visibilidade da confirmação de senha
//               value={confirmarSenha}
//               onChangeText={setConfirmarSenha}
//             />
//             <TouchableOpacity onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}>
//               <Icon
//                 name={showConfirmarSenha ? 'unlock' : 'lock'}
//                 size={20}
//                 color="#919191"
//                 style={{ marginRight: 10 }}
//               />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.button} onPress={handleRegister}>
//             <Text style={styles.buttonText}>Cadastrar</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.buttonRegister}>
//             <Text style={styles.registerText}>Termos de Uso e Política de Privacidade</Text>
//           </TouchableOpacity>
//         </Animatable.View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#8b0045',
//   },

//   container2: {
//     flex: 1,
//     backgroundColor: '#ffff',
//     margin: '1%',
//     marginTop: 0,
//     marginBottom: 5,
//     borderRadius: 25,
//     paddingTop: '10%',
//   },

//   message: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginTop: '10%',
//     marginBottom: '5%',
//     textAlign: 'center',
//     color: '#ffff',
//   },

//   information: {
//     marginBottom: 40,
//     fontSize: 23,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#ffff',
//   },

//   input: {
//     borderBottomWidth: 0.7,
//     borderBottomColor: '#8b0045',
//     height: 40,
//     marginBottom: 40,
//     fontSize: 18,
//     paddingLeft: 10,
//     width: '90%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: '5%',
//     color: '#8b0045',
//   },

//   button: {
//     backgroundColor: '#8b0045',
//     paddingVertical: 9,
//     marginTop: 20,
//     marginBottom: 41,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 50,
//     width: '60%',
//     alignSelf: 'center',
//   },

//   buttonText: {
//     color: '#ffff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },

//   buttonRegister: {
//     margin: 20,
//     alignSelf: 'center',
//   },

//   registerText: {
//     color: '#FAFAFA',
//     fontSize: 16,
//   },

//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 2,
//   },
// });

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { DataContext } from '../../Persistence/DataContext'; 
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function Register() {
  const navigation = useNavigation();
  const { appData, setAppData } = useContext(DataContext); // Acessando o contexto global
  
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nomeNegocio, setNomeNegocio] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // Definindo o estado para controlar a visibilidade das senhas
  const [showSenha, setShowSenha] = useState(false); // Visibilidade da senha
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false); // Visibilidade da confirmação de senha

  // Função para validar e-mail
  const validarEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Função para validar telefone
  const validarTelefone = (telefone) => {
    const telefoneRegex = /^\(?\d{2}\)?\s?9?\s?\d{4}-\d{4}$/;
    return telefoneRegex.test(telefone);
  };

  // Função para formatar o telefone no padrão (XX) 9XXXX-XXXX
  const formatarTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, ''); // Remove tudo que não for número

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

  const handleCadastro = () => {
    // Verificando se todos os campos estão preenchidos
    if (!nomeCompleto || !nomeNegocio || !email || !telefone || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Validando o e-mail
    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    // Validando o telefone
    if (!validarTelefone(telefone)) {
      Alert.alert('Erro', 'Por favor, insira um telefone válido no formato (XX) 9XXXX-XXXX.');
      return;
    }

    // Verificando se as senhas são iguais
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Atualizando o estado global diretamente com os valores fornecidos
    setAppData((prev) => ({
      ...prev,
      nomeCompleto, // Nome do usuário
      businessName: nomeNegocio, // Nome do negócio
      email, // E-mail do usuário
      telefone: formatarTelefone(telefone), // Telefone formatado
    }));

    // Limpando os campos após cadastro
    setNomeCompleto('');
    setNomeNegocio('');
    setEmail('');
    setTelefone('');
    setSenha('');
    setConfirmarSenha('');

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
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
            placeholderTextColor="#F0F0F0"
            style={styles.input}
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />

          <TextInput
            placeholder="Nome do Negócio"
            placeholderTextColor="#F0F0F0"
            style={styles.input}
            value={nomeNegocio}
            onChangeText={setNomeNegocio}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#F0F0F0"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Telefone/Contato"
            placeholderTextColor="#F0F0F0"
            style={styles.input}
            value={telefone}
            onChangeText={(text) => setTelefone(formatarTelefone(text))}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { width: '75%' }]}
              placeholder="Criar Senha"
              placeholderTextColor="#F0F0F0"
              secureTextEntry={!showSenha}  // Controla a visibilidade da senha
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setShowSenha(!showSenha)}>
              <Icon
                name={showSenha ? 'unlock' : 'lock'}
                size={20}
                color="#919191"
                style={{ marginRight: 25 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { width: '75%' }]}
              placeholder="Confirmar Senha"
              placeholderTextColor="#F0F0F0"
              secureTextEntry={!showConfirmarSenha}  // Controla a visibilidade da confirmação de senha
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}>
              <Icon
                name={showConfirmarSenha ? 'unlock' : 'lock'}
                size={20}
                color="#919191"
                style={{ marginRight: 25 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister}>
            <Text style={styles.registerText}>Termos de Uso e Política de Privacidade</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },

  container2: {
    flex: 1,
    backgroundColor: '#8b0045', 
    margin: '1%',
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 25,
    paddingTop: '10%',
  },

  message: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '5%',
    textAlign: 'center',
    color: '#8b0045', 
  },

  information: {
    marginBottom: 40,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#8b0045', 
  },

  input: {
    borderBottomWidth: 0.7,
    borderBottomColor: '#D9D9D9', 
    height: 40,
    marginBottom: 40,
    fontSize: 18,
    paddingLeft: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    color: '#fafafa',  
  },

  button: {
     
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 9,
    marginTop: 20,
    marginBottom: 41,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '60%',
    alignSelf: 'center',
  },

  buttonText: {
    color: '#8b0045', 
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonRegister: {
    margin: 20,
    alignSelf: 'center',
  },

  registerText: {
    color: '#D9D9D9', 
    fontSize: 16,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
  },
});

