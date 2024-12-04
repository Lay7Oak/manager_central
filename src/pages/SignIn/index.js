
// import React, { useContext, useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { useNavigation } from '@react-navigation/native';
// import { DataContext } from '../../Persistence/DataContext';  
// import Icon from 'react-native-vector-icons/FontAwesome'; 

// export default function SignIn() {
//   const navigation = useNavigation();
//   const { appData, setAppData } = useContext(DataContext);  
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [showSenha, setShowSenha] = useState(false);  

//   // Função para validar e realizar o login
//   const handleLogin = () => {
//     // Verificar se o email e senha estão preenchidos
//     if (email && senha) {
//       //  substituIR por uma API de login
//       if (email === ' ' && senha === ' ') {
//         // Salvar dados de login no contexto global
//         const userData = { email, nome: 'Usuário Teste' };  
//         setAppData({ ...appData, user: userData });  // Armazena os dados no contexto global

    
//         navigation.navigate('MainPage');
//       } else {
//         Alert.alert('Erro', 'Credenciais inválidas');
//       }
//     } else {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
//         <Text style={styles.message}>Olá,</Text>
//       </Animatable.View>
//       <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader2}>
//         <Text style={styles.message}>Bem-Vindo(a) à Central do Gerenciador!</Text>
//       </Animatable.View>

//       <Animatable.View animation="fadeInUp" style={styles.containerForm}>
//         <Text style={styles.title}></Text>
//         <TextInput
//           placeholder="Email"
//           placeholderTextColor="#808080"
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//         />

//         <Text style={styles.title}></Text>
//          <View style={styles.passwordContainer}>
//           <TextInput
//             style={[styles.input, { width: '85%' }]}
//             placeholder="Senha"
//             placeholderTextColor="#808080"
//             secureTextEntry={!showSenha}  // Controla a visibilidade da senha
//             value={senha}
//             onChangeText={setSenha}
//           />
//           <TouchableOpacity onPress={() => setShowSenha(!showSenha)}>
//             <Icon
//               name={showSenha ? 'unlock' : 'lock'}
//               size={20}
//               color="#919191"
//               style={{ marginRight: 10 }}
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.esqueceText}
//           onPress={() => navigation.navigate('ForgotPassword')}
//         >
//           <Text style={styles.registerText}>Esqueceu a senha?</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Acessar</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.buttonRegister}
//           onPress={() => navigation.navigate('Register')}
//         >
//           <Text style={styles.registerText}>Não possui uma conta? Cadastre-se!</Text>
//         </TouchableOpacity>
//       </Animatable.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#8b0045',
//   },
//   containerHeader: {
//     marginTop: '20%',
//     marginBottom: '1%',
//     paddingStart: '3%',
//   },
//   containerHeader2: {
//     paddingStart: '3%',
//     marginBottom: '9%',
//   },
//   message: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     color: '#ffff',
//   },
//   containerForm: {
//      flex: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)', 
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     paddingStart: '5%',
//     paddingEnd: '5%',
//   },
//   title: {
//     fontSize: 20,
//     marginTop: 40,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#8b0045',
//     height: 40,
//     marginBottom: 12,
//     fontSize: 18,
//     color: '#8b0045',
//   },
//   button: {
//     backgroundColor: '#8b0045',
//     paddingVertical: 9,
//     marginTop: 41,
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
//     marginTop: 40,
//     alignSelf: 'center',
//   },
//   registerText: {
//     color: '#919191',
//     fontSize: 15,
//   },
//   esqueceText: {
//     color: '#919191',
//     fontSize: 15,
//     marginTop: 0,
//     marginEnd: '1%',
//     alignSelf: 'flex-start',
//     position: 'static',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding:2,
//   },
// });

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../Persistence/DataContext';  
import Icon from 'react-native-vector-icons/FontAwesome'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignIn() {
  const navigation = useNavigation();
  const { appData, setAppData } = useContext(DataContext);  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);  

  const handleLogin = async () => {
    
    if (email === '' || senha === '') {
      Alert.alert('Erro', 'Por favor, insira o e-mail e a senha.');
      return;
    }

    
    if (email === 'usuario@managercentral.br' && senha.length === 7) {
      
      const userData = { nome: 'Usuário de Teste', email, senha };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

          
      navigation.navigate('MainPage');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas ou senha com formato errado.');
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
        <Text style={styles.title}></Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#808080"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}></Text>
         <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { width: '85%' }]}
            placeholder="Senha"
            placeholderTextColor="#808080"
            secureTextEntry={!showSenha}  // Controla a visibilidade da senha
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setShowSenha(!showSenha)}>
            <Icon
              name={showSenha ? 'unlock' : 'lock'}
              size={20}
              color="#919191"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.esqueceText}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.registerText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se!</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8b0045',
  },
  containerHeader: {
    marginTop: '20%',
    marginBottom: '1%',
    paddingStart: '3%',
  },
  containerHeader2: {
    paddingStart: '3%',
    marginBottom: '9%',
  },
  message: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#ffff',
  },
  containerForm: {
     flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 20,
    marginTop: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#8b0045',
    height: 40,
    marginBottom: 12,
    fontSize: 18,
    color: '#8b0045',
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
  buttonRegister: {
    marginTop: 40,
    alignSelf: 'center',
  },
  registerText: {
    color: '#919191',
    fontSize: 15,
  },
  esqueceText: {
    color: '#919191',
    fontSize: 15,
    marginTop: 0,
    marginEnd: '1%',
    alignSelf: 'flex-start',
    position: 'static',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:2,
  },
});

