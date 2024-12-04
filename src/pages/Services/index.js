import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataContext } from '../../Persistence/DataContext';
import * as FileSystem from 'expo-file-system'; // Para salvar o PDF (caso esteja usando Expo)


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

    const precoFormatado = novoServico.preco.replace('.', '').replace(',', '.'); // Corrige o formato do preço
    const servico = {
      ...novoServico,
      id: novoServico.id || Date.now().toString(),
      preco: parseFloat(precoFormatado).toFixed(2), // Salva no formato numérico correto
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
      // Adiciona uma receita se o status for alterado para "Concluído"
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
      setNovoServico({
        ...servico,
        preco: servico.preco.replace('.', ','), // Ajusta o preço para o formato brasileiro
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

  // Ordenação dos serviços
  const servicosOrdenados = ordenarPor === 'novos'
    ? servicosFiltrados.sort((a, b) => new Date(b.dataExecucao) - new Date(a.dataExecucao))
    : servicosFiltrados.sort((a, b) => new Date(a.dataExecucao) - new Date(b.dataExecucao));

  // Função para gerar o PDF
  const gerarPDF = (servicos) => {
    return `Lista de Serviços:\n\n${servicos
      .map(
        (servico) =>
          `Cliente: ${servico.cliente}\nTipo de Serviço: ${servico.tipoServico}\nPreço: R$ ${servico.preco}\n\n`
      )
      .join('')}`;
  };

  // Função para baixar o PDF
  const downloadPDF = async () => {
    try {
      const pdfData = gerarPDF(servicosFiltrados);
      const uri = FileSystem.documentDirectory + 'lista_servicos.pdf';
      await FileSystem.writeAsStringAsync(uri, pdfData, { encoding: FileSystem.EncodingType.Base64 });
      Alert.alert('PDF', 'A lista foi salva como PDF.');
    } catch (error) {
      console.error('Erro ao salvar PDF:', error);
      Alert.alert('Erro', 'Não foi possível salvar o PDF.');
    }
  };

  // Função para limpar a lista com confirmação
const handleLimparLista = () => {
    Alert.alert(
      'Limpar Lista',
      'Tem certeza que deseja limpar a lista de serviços? Os dados serão apagados da lista e mantidos apenas no PDF.',
      [
        { text: 'Cancelar' },
        { 
          text: 'Baixar PDF e Limpar', 
          onPress: () => {
            // Aqui você pode integrar a função para gerar o PDF
            setServicos([]);
            setAppData({ ...appData, servicos: [] });
          }
        },
      ]
    );
  };

  return (
    <ScrollView >
    <StatusBar backgroundColor="#e14f50" barStyle="light-content" />
     
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
              <Icon name="calendar" size={20} color="#8b0045" />
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
              <Icon name="calendar" size={20} color="#8b0045" />
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
              minimumDate={new Date()} // Impede a seleção de datas no passado
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

          <Text style={styles.label}>Status:</Text>
          <Picker
            selectedValue={novoServico.status}
            onValueChange={itemValue => setNovoServico({ ...novoServico, status: itemValue })}
            style={styles.dropdown}
          >
            <Picker.Item label="Pendente" value="Pendente" />
            <Picker.Item label="Concluído" value="Concluído" />
            <Picker.Item label="Cancelado" value="Cancelado" />
          </Picker>

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
                  onPress={() => alterarStatus(servico.id, 'Cancelado')}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonSmall, styles.concluidoButton]}
                  onPress={() => alterarStatus(servico.id, 'Concluído')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  searchContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#e14f50',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputWithIcon: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10,  borderRadius: 5, },
  datePickerContainer: { flexDirection: 'row', alignItems: 'center' },
  
  iconButton: { marginLeft: 10 },
  button: {
    backgroundColor: '#e14f50',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff',
    fontWeight: 'bold',
    fontSize:18, },
    
  sectionTitle: { fontSize: 21, fontWeight: 'bold', marginTop: 20, textAlign:'center', },

  buttonOrg: {
    marginTop:20,
    width:'47%',
    backgroundColor: '#E87071',
    paddingVertical: 10,
    paddingHorizontal: 9,
    borderRadius: 5,
    alignItems: 'center',
    margin: '1%',
    textAlign:'center',
  },

  divider: { borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 10, flexGrow: 1, 
    paddingBottom: 20, },

  servico: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  servicoText: {
    fontSize: 19,
    marginBottom: 5,
  },

  pedidoTextStatus:{
   fontSize:22,
   marginBottom: 30,
   marginTop:9,
  
  },

    headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',  
    width: '100%',
    marginBottom: 10,      
  },

  containerButtonSmall:{
   flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    // marginHorizontal: 12,

  },

  buttonSmall: {
     paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 15,
  },
  concluidoButton: { backgroundColor: '#43c3bb' },
  canceladoButton: { backgroundColor: '#919191' },
  editButton: { backgroundColor: '#f0ad4e' },
  
});

