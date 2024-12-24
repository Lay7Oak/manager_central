import React, { useState, useContext, useEffect } from 'react';
import {  View,  Text,  TextInput,  TouchableOpacity,  StyleSheet,  ScrollView,  Alert,  StatusBar,} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataContext } from '../../Persistence/DataContext';
import * as FileSystem from 'expo-file-system'; 
import styles from './style';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function Servicos() {
  const { appData, setAppData } = useContext(DataContext);
  const [servicos, setServicos] = useState(appData?.servicos || []);
  const [novoServico, setNovoServico] = useState({
    id: '',
    tipoServico: '',
    descricao: '',
    preco: '',
    dataExecucao: new Date(),
    dataAgendada: new Date(),
    status: 'Pendente',
    cliente: '',
  });
  const [busca, setBusca] = useState('');
  const [showDatePickerExecucao, setShowDatePickerExecucao] = useState(false);
  const [showDatePickerAgendada, setShowDatePickerAgendada] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState('novos');

  useEffect(() => {
    if (appData?.servicos) {
      setServicos(appData.servicos);
    }
  }, [appData]);

  const adicionarServico = () => {
    if (!novoServico.tipoServico || !novoServico.descricao || !novoServico.preco || !novoServico.cliente) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const precoFormatado = novoServico.preco.replace('.', '').replace(',', '.'); 
    const servico = {
      ...novoServico,
      id: novoServico.id || Date.now().toString(),
      preco: parseFloat(precoFormatado).toFixed(2), 
      dataExecucao: novoServico.dataExecucao instanceof Date ? novoServico.dataExecucao : new Date(),
    };

    const novosServicos = novoServico.id
      ? servicos.map(s => (s.id === novoServico.id ? servico : s))
      : [...servicos, servico];

    setServicos(novosServicos);
    setAppData(prev => ({ ...prev, servicos: novosServicos }));

    setNovoServico({
      id: '',
      tipoServico: '',
      descricao: '',
      preco: '',
      dataExecucao: new Date(),
      status: 'Pendente',
      cliente: '',
    });
  };

const alterarStatus = (id, novoStatus) => {
  const dataAtual = new Date();
  const servicosAtualizados = servicos.map(servico => {
    if (servico.id === id) {
    
      if (novoStatus === 'Concluído' && servico.status !== 'Concluído') {
        const novaReceita = {
          tipo: 'receita',
          valor: parseFloat(servico.preco),
          descricao: `Serviço concluído: ${servico.descricao}`,
          data: dataAtual,
        };
        const novasTransacoes = [...appData.transacoes, novaReceita];
        setAppData(prev => ({ ...prev, transacoes: novasTransacoes }));
      }

      return { ...servico, status: novoStatus, statusData: dataAtual };
    }
    return servico;
  });

  setServicos(servicosAtualizados);
  setAppData(prev => ({ ...prev, servicos: servicosAtualizados }));
};

const editarServico = id => {
  const servico = servicos.find(s => s.id === id);
  if (servico) {
    if (servico.status !== 'Pendente') {
      Alert.alert('Ação não permitida', 'Somente serviços com status "Pendente" podem ser editados.');
      return; 
    }

    setNovoServico({
      ...servico,
      preco: servico.preco.replace('.', ','), 
    });
  }
};

  const excluirServico = id => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja excluir este serviço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const servicosAtualizados = servicos.filter(s => s.id !== id);
            setServicos(servicosAtualizados);
            setAppData(prev => ({ ...prev, servicos: servicosAtualizados }));
          },
        },
      ]
    );
  };

  const servicosFiltrados = servicos.filter(servico =>
    servico.cliente.toLowerCase().includes(busca.toLowerCase()) ||
    servico.tipoServico.toLowerCase().includes(busca.toLowerCase())
  );


  const servicosOrdenados = ordenarPor === 'novos'
    ? servicosFiltrados.sort((a, b) => new Date(b.dataExecucao) - new Date(a.dataExecucao))
    : servicosFiltrados.sort((a, b) => new Date(a.dataExecucao) - new Date(b.dataExecucao));

      const handleLimparLista = () => {
      Alert.alert(
        'Limpar Lista',
        'Tem certeza que deseja limpar a lista de serviços? Os dados serão apagados da lista e mantidos apenas no PDF. Por favor, escolha salvar ou compartilhar o PDF para garantir que os dados não sejam perdidos.',
        [
          { text: 'Cancelar' },
          { 
            text: 'Baixar PDF e Limpar', 
            onPress: async () => {
              await generatePDF();
              setServicos([]);
              setAppData({ ...appData, servicos: [] });
            }
          },
        ]
      );
    };

    const generatePDF = async () => { 
      const htmlContent = `
        <html> 
          <head>
            <style>
              ul {
                list-style-type: none;
                padding: 0;
              }
              li {
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body> 
            <h1>Lista de Serviços</h1>
            <ul> 
              ${servicos.map(servico => ` 
                <li> 
                  <strong>Cliente:</strong> ${servico.cliente} <br />
                  <strong>Tipo de Serviço:</strong> ${servico.tipoServico} <br /> 
                  <strong>Preço:</strong> R$ ${servico.preco} <br />
                  <strong>Data de Execução:</strong> ${new Date(servico.dataExecucao).toLocaleDateString()} <br />
                  <strong>Status:</strong> ${servico.status} <br />
                  <strong>Descrição:</strong> ${servico.descricao} <br />
                </li> 
              `).join('')}
            </ul> 
          </body> 
        </html>
      `; 
    
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    };
    
  return (
    <ScrollView >
    <StatusBar backgroundColor="#de3f40" barStyle="light-content" />
     
      <View style={styles.container}>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por Cliente ou Tipo de Serviço"
            value={busca}
            onChangeText={text => setBusca(text)}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.total}>Adicionar Serviços </Text>

        <ScrollView style={styles.scrollView}>
          <TextInput
            placeholder="Tipo de Serviço"
            style={styles.input}
            value={novoServico.tipoServico}
            onChangeText={text => setNovoServico({ ...novoServico, tipoServico: text })}
          />

          <View style={styles.datePickerContainer}>
            <TextInput
              placeholder="Data Solicitação"
              style={styles.inputWithIcon}
              value={
                novoServico.dataExecucao instanceof Date && !isNaN(novoServico.dataExecucao)
                  ? novoServico.dataExecucao.toLocaleDateString()
                  : ''
              }
              onFocus={() => setShowDatePickerExecucao(true)}
              showSoftInputOnFocus={false}
            />
            <TouchableOpacity onPress={() => setShowDatePickerExecucao(true)} style={styles.iconButton}>
              <Icon name="calendar" size={25} color="#E87071" />
            </TouchableOpacity>
          </View>

          {showDatePickerExecucao && (
            <DateTimePicker
              value={novoServico.dataExecucao instanceof Date ? novoServico.dataExecucao : new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePickerExecucao(false);
                if (date) {
                  setNovoServico({ ...novoServico, dataExecucao: date });
                }
              }}
            />
          )}

          <View style={styles.datePickerContainer}>
            <TextInput
              placeholder="Data Agendada"
              style={styles.inputWithIcon}
              value={
                novoServico.dataAgendada instanceof Date && !isNaN(novoServico.dataAgendada)
                  ? novoServico.dataAgendada.toLocaleDateString()
                  : ''
              }
              onFocus={() => setShowDatePickerAgendada(true)}
              showSoftInputOnFocus={false}
            />
            <TouchableOpacity onPress={() => setShowDatePickerAgendada(true)} style={styles.iconButton}>
              <Icon name="calendar" size={25} color="#E87071" />
            </TouchableOpacity>
          </View>

          {showDatePickerAgendada && (
            <DateTimePicker
              value={novoServico.dataAgendada instanceof Date ? novoServico.dataAgendada : new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePickerAgendada(false);
                if (date) {
                  setNovoServico({ ...novoServico, dataAgendada: date });
                }
              }}
              minimumDate={new Date()} 
            />
          )}

          <TextInput
            placeholder="Descrição do Serviço"
            style={styles.input}
            value={novoServico.descricao}
            onChangeText={text => setNovoServico({ ...novoServico, descricao: text })}
          />

          <TextInput
            placeholder="Preço (Ex: 0,25 | 10,00 | 2.500,00)"
            style={styles.input}
            keyboardType="numeric"
            value={novoServico.preco}
            onChangeText={text => setNovoServico({ ...novoServico, preco: text })}
          />

          
          <TextInput
            placeholder="Cliente"
            style={styles.input}
            value={novoServico.cliente}
            onChangeText={text => setNovoServico({ ...novoServico, cliente: text })}
          />

          <TouchableOpacity style={styles.button} onPress={adicionarServico}>
            <Text style={styles.buttonText}>
              {novoServico.id ? 'Salvar Alterações' : 'Adicionar Serviço'}
            </Text>
          </TouchableOpacity>

        <View style={styles.divider} />
         <Text style={styles.sectionTitle}>Lista de Serviços</Text>
          <View style={styles.headerContainer}>

           <TouchableOpacity style={styles.buttonOrg} onPress={handleLimparLista}>
              <Text style={styles.buttonText}>Limpar Lista</Text>
            </TouchableOpacity>
           
            <TouchableOpacity
              style={styles.buttonOrg}
              onPress={() => setOrdenarPor(ordenarPor === 'novos' ? 'antigos' : 'novos')} >
              <Text style={styles.buttonText}>
                {ordenarPor === 'novos' ? 'Ordenar Antigos' : 'Ordenar Novos'}
              </Text>
            </TouchableOpacity>
          </View>

          {servicosFiltrados.map(servico => (
            <View key={servico.id} style={styles.servico}>
              <Text style={styles.servicoText}>Cliente: {servico.cliente}</Text>
              <Text style={styles.servicoText}>Tipo de Serviço: {servico.tipoServico}</Text>
              <Text style={styles.servicoText}>Data da Solicitação: {new Date(servico.dataExecucao).toLocaleDateString()}</Text>
              <Text style={styles.servicoText}>Data Agendada: {new Date(servico.dataAgendada).toLocaleDateString()}</Text>
              <Text style={styles.servicoText}>Descrição: {servico.descricao}</Text>
              <Text style={styles.servicoText}>Preço: R$ {servico.preco.replace('.', ',')}</Text>
              <Text style={styles.servicoText}>Status Data: {servico.statusData ? new Date(servico.statusData).toLocaleDateString() : ''}</Text>
              <Text style={styles.pedidoTextStatus}>Status: {servico.status}</Text>

              <View style={styles.containerButtonSmall}>
                  <TouchableOpacity
                    style={[styles.buttonSmall, styles.editButton]}
                    onPress={() => editarServico(servico.id)}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.buttonSmall, styles.canceladoButton]}
                    onPress={() => {
                      if (servico.status === 'Concluído') {
                        Alert.alert('Ação inválida', 'Este serviço já foi concluído e não pode ser cancelado.');
                      } else {
                        alterarStatus(servico.id, 'Cancelado');
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.buttonSmall, styles.concluidoButton]}
                    onPress={() => {
                      if (servico.status === 'Cancelado') {
                        Alert.alert('Ação inválida', 'Este serviço já foi cancelado.');
                      } else {
                        alterarStatus(servico.id, 'Concluído');
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Concluído</Text>
                  </TouchableOpacity>
                </View>
            </View>
          ))}

          <View>
            
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

