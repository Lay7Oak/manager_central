
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataContext } from '../../Persistence/DataContext'; // Importando o contexto global

const statusBarHeight = 30;

export default function MainPage() {
  const navigation = useNavigation();
  const { appData } = useContext(DataContext); // Acessando dados globais

  return (
    <ScrollView>
      <View style={[styles.statusBar, { height: statusBarHeight }]}/>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.barraUsuario}>
            <Text style={styles.userName}>Olá, {appData?.nomeCompleto || 'Nome do Usuário'}</Text>
            <TouchableOpacity style={styles.iconUser}
            onPress={() => navigation.navigate('UserPage')}>
              <Icon name="user-circle" size={26} color="#919191" />
            </TouchableOpacity>
          </View>

          <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader2}>
            <Text style={styles.message}>{appData?.businessName || 'Nome do Negócio'}</Text>
          </Animatable.View>
        </View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <TouchableOpacity
            style={[styles.servicos, { backgroundColor: '#331436' }]}  
            onPress={() => navigation.navigate('Stock')}
          >
            <Icon name="cart-plus" size={30} color="#fff" />
            <Text style={styles.servicosText}>Estoque</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.servicos, { backgroundColor: '#7A1745' }]} 
            onPress={() => navigation.navigate('Orders')}
          >
            <Icon name="list-alt" size={30} color="#fff" />
            <Text style={styles.servicosText}>Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.servicos, { backgroundColor: '#CB4F57' }]}
            onPress={() => navigation.navigate('Customer')}
          >
            <Icon name="users" size={30} color="#fff" />
            <Text style={styles.servicosText}>Clientes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.servicos, { backgroundColor: '#e14f50' }]}  
            onPress={() => navigation.navigate('Services')}
          >
            <Icon name="cogs" size={30} color="#fff" />
            <Text style={styles.servicosText}>Serviços</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.servicos, { backgroundColor: '#f0ad4e' }]}  
            onPress={() => navigation.navigate('Finance')}
          >
            <Icon name="credit-card" size={30} color="#fff" />
            <Text style={styles.servicosText}>Financeiro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ajuda}>
            <Text style={styles.ajudaText}>Preciso de Ajuda</Text>
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
    backgroundColor: '#fff',
  },

  statusBar: {
    backgroundColor: "#8b0045",  // Cor de fundo da StatusBar simulada
  },

  barraUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'space-between',
  },

  userName: { 
    fontSize: 23,
    color: "#8b0045",
    marginLeft: '7%',
  },

  iconUser: {
    width: 50,
    height: 50,
    marginRight: '5%',
    borderRadius: 50 / 2, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#919191', 
    padding: 10,
  },

  containerHeader: {
    marginTop: '7%',
    marginBottom: '1%',
    paddingStart: '3%',
  },

  containerHeader2: {
    paddingStart: '3%',
    marginBottom: '9%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  message: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6a003d',
  },

  containerForm: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: '10%',
    paddingStart: '5%',
    paddingEnd: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  servicos: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    marginBottom: 17,
    borderRadius: 17,
    elevation: 7,
    flexDirection: 'row', // Alinha o ícone e o texto horizontalmente
    // justifyContent: 'flex-start', // Coloca o texto ao lado do ícone
  },

  servicosText: {
    fontSize: 27,
    color: '#fff',
    marginLeft: 15, // Espaço entre o ícone e o texto
  },

  ajuda: {
    marginTop: 40,
    marginBottom: 40,
  },

  ajudaText: {
    color: '#919191',
    fontSize: 20,
  },

  buttonRegister: {
    margin: 40,
    alignSelf: 'center',
  },

  registerText: {
    color: '#919191',
    fontSize: 15,
  },
});
