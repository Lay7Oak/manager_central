import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import { DataContext } from '../../Persistence/DataContext';
import styles from './style';

const statusBarHeight = 30;

export default function MainPage() {
  const navigation = useNavigation();
  const { appData } = useContext(DataContext); 
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const checkModalSeen = async () => {
      const hasSeenModal = await SecureStore.getItemAsync('hasSeenModal');
      if (!hasSeenModal) {
        setModalVisible(true);
      }
    };
    checkModalSeen();
  }, []);

  const handleCloseModal = async () => {
    await SecureStore.setItemAsync('hasSeenModal', 'true');
    setModalVisible(false);
  };

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
            style={[styles.servicos, { backgroundColor: '#fff',  borderLeftWidth: 25, borderLeftColor: '#331436',}]}
            onPress={() => navigation.navigate('Stock')}
          >
            <Icon name="cart-plus" size={30} color="#331436" />
            <Text style={styles.servicosText}>Estoque</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.servicos, { backgroundColor: '#fff',  borderLeftWidth: 25, borderLeftColor: '#7A1745', }]} 
            onPress={() => navigation.navigate('Orders')}
          >
            <Icon name="list-alt" size={30} color="#7A1745" />
            <Text style={styles.servicosText}>Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.servicos, { backgroundColor: '#fff',  borderLeftWidth: 25, borderLeftColor: '#de3f40', }]}  
            onPress={() => navigation.navigate('Services')}
          >
            <Icon name="cogs" size={30} color="#de3f40" />
            <Text style={styles.servicosText}>Serviços</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.servicos, { backgroundColor: '#fff',  borderLeftWidth: 25, borderLeftColor: '#CB4F57', }]}
            onPress={() => navigation.navigate('Customer')}
          >
            <Icon name="users" size={30} color="#CB4F57" />
            <Text style={styles.servicosText}>Clientes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.servicos, { backgroundColor: '#fff',  borderLeftWidth: 25, borderLeftColor: '#33808a', }]}  
            onPress={() => navigation.navigate('Finance')}
          >
            <Icon name="credit-card" size={30} color="#33808a" />
            <Text style={styles.servicosText}>Financeiro</Text>
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

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Olá! Bem-vindo à Central do Gerenciador</Text>
            <Text style={styles.modalDescription}>
              Aqui você pode gerenciar estoque, pedidos, serviços, clientes e finanças de forma simples e eficiente.
            </Text>
            <Text style={styles.modalDescription}>
              Esta é uma versão de teste, com funcionalidades básicas. Aguardamos seu feedback para melhorias e evolução.
            </Text>
            <Text
              style={styles.modalLink}
              onPress={() => Linking.openURL('https://forms.gle/iiYJ9WzNv2Y7aoqF7')}
            >
              Acesse o formulário
            </Text>
            <Text style={styles.modalNote}>
              Em caso de dúvidas, consulte a tela de Ajuda. Não esqueça de ler o Termo de Uso e a Política de Privacidade.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
