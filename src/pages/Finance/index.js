import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataContext } from '../../Persistence/DataContext'; 
import DateTimePicker from '@react-native-community/datetimepicker';



export default function Finance() {
  const { appData, setAppData } = useContext(DataContext); 
  const [valorReceitaExtra, setValorReceitaExtra] = useState('');
  const [descricaoReceita, setDescricaoReceita] = useState('');
  const [valorGastoExtra, setValorGastoExtra] = useState('');
  const [descricaoGasto, setDescricaoGasto] = useState('');
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ordenarPorMaisNovos, setOrdenarPorMaisNovos] = useState(true); 

  useEffect(() => {
    if (appData?.transacoes) {
      setTransacoes(appData.transacoes);
    }
  }, [appData]);

  const [transacoes, setTransacoes] = useState(appData?.transacoes || []);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [novoPedido, setNovoPedido] = useState({ data: new Date() });

  const calcularReceitas = () => transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + parseFloat(t.valor), 0);
  const calcularDespesas = () => transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + parseFloat(t.valor), 0);

  
  const adicionarReceitaExtra = () => {
    if (!valorReceitaExtra || !descricaoReceita) {
      Alert.alert('Erro', 'Preencha todos os campos da receita.');
      return;
    }
    const novaTransacao = { tipo: 'receita', valor: parseFloat(valorReceitaExtra), descricao: descricaoReceita, data: novoPedido.data };
    const novasTransacoes = [...transacoes, novaTransacao];
    setTransacoes(novasTransacoes);
    setAppData(prev => ({ ...prev, transacoes: novasTransacoes }));
    setValorReceitaExtra('');
    setDescricaoReceita('');
  };

  const adicionarGastoExtra = () => {
    if (!valorGastoExtra || !descricaoGasto) {
      Alert.alert('Erro', 'Preencha todos os campos do gasto.');
      return;
    }
    const novaTransacao = { tipo: 'despesa', valor: -parseFloat(valorGastoExtra), descricao: descricaoGasto, data: novoPedido.data };
    const novasTransacoes = [...transacoes, novaTransacao];
    setTransacoes(novasTransacoes);
    setAppData(prev => ({ ...prev, transacoes: novasTransacoes }));
    setValorGastoExtra('');
    setDescricaoGasto('');
  };

  const filtrarTransacoes = () => {
    if (!searchQuery) return transacoes; 
    const lowerQuery = searchQuery.toLowerCase();
    return transacoes.filter(transacao => {
      if (lowerQuery === 'receita' && transacao.tipo === 'receita') return true;
      if (lowerQuery === 'despesa' && transacao.tipo === 'despesa') return true;
      if (lowerQuery && !isNaN(lowerQuery) && parseFloat(lowerQuery) === Math.abs(transacao.valor)) return true;
      return transacao.descricao.toLowerCase().includes(lowerQuery) || 
             transacao.valor.toString().includes(lowerQuery);
    });
  };

  const ordenarTransacoes = () => {
    const transacoesOrdenadas = [...transacoes].sort((a, b) => {
      const dateA = new Date(a.data);
      const dateB = new Date(b.data);
      return ordenarPorMaisNovos ? dateB - dateA : dateA - dateB;
    });
    setTransacoes(transacoesOrdenadas);
    setAppData(prev => ({ ...prev, transacoes: transacoesOrdenadas }));
  };

  const receitas = calcularReceitas();
  const despesas = calcularDespesas();
  const lucro = receitas + despesas;

  const limparLista = () => {
    Alert.alert(
      'Limpar Lista',
      'Tem certeza que deseja limpar a lista de transações? Os dados serão apagados da lista e mantidos apenas no PDF.',
      [
        { text: 'Cancelar' },
        { 
          text: 'Baixar PDF e Limpar', 
          onPress: () => {
            setTransacoes([]);
            setAppData({ ...appData, transacoes: [] });
          }
        },
      ]
    );
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || novoPedido.data;
    setShowDatePicker(false); 
    setNovoPedido({ ...novoPedido, data: currentDate });
  };

  return (
    <ScrollView>
      <StatusBar backgroundColor="#f0ad4e" barStyle="light-content" />
    
      <View style={styles.container}>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar por Receita, Despesa ou Valor"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.dashboard}>
          <Text style={styles.dashboardItem}>
            Receitas: <Text style={styles.receita}>R$ {receitas.toFixed(2)}</Text>
          </Text>
          <Text style={styles.dashboardItem}>
            Despesas: <Text style={styles.despesa}>R$ {Math.abs(despesas).toFixed(2)}</Text>
          </Text>
          <Text style={styles.dashboardItem}>
            Lucro: <Text style={lucro >= 0 ? styles.receita : styles.despesa}>R$ {lucro.toFixed(2)}</Text>
          </Text>
        </View>

        {/* Seção de adicionar receita e gasto */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Adicionar Receita Extra</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconButton}>
              <Icon name="calendar" size={20} color="#8b0045" />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Digite o valor da receita"
            style={styles.input}
            value={valorReceitaExtra}
            onChangeText={setValorReceitaExtra}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Descrição da receita"
            style={styles.input}
            value={descricaoReceita}
            onChangeText={setDescricaoReceita}
          />
          <TouchableOpacity style={styles.button} onPress={adicionarReceitaExtra}>
            <Text style={styles.buttonText}>Adicionar Receita</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={novoPedido.data}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Adicionar Gasto */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Adicionar Gasto Extra</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconButton}>
              <Icon name="calendar" size={20} color="#8b0045" />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Digite o valor do gasto"
            style={styles.input}
            value={valorGastoExtra}
            onChangeText={setValorGastoExtra}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Descrição do gasto"
            style={styles.input}
            value={descricaoGasto}
            onChangeText={setDescricaoGasto}
          />
          <TouchableOpacity style={styles.button} onPress={adicionarGastoExtra}>
            <Text style={styles.buttonText}>Adicionar Gasto</Text>
          </TouchableOpacity>
        </View>

        {/* Detalhes */}
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => setMostrarDetalhes(!mostrarDetalhes)}
        >
          <Text style={styles.detailsButtonText}>
            {mostrarDetalhes ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
          </Text>
        </TouchableOpacity>

        {/* Transações Detalhadas */}
        {mostrarDetalhes && (
          <View style={styles.transacoesContainer}>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.buttonOrg} onPress={limparLista}>
                <Text style={styles.buttonText}>Limpar Lista</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOrg} onPress={() => {
                setOrdenarPorMaisNovos(!ordenarPorMaisNovos);
                ordenarTransacoes();
              }}>
                <Text style={styles.buttonText}>
                  {ordenarPorMaisNovos ? 'Ordenar Antigo' : 'Ordenar Novo'}
                </Text>
              </TouchableOpacity>
            </View>
            {filtrarTransacoes().map((transacao, index) => (
              <View key={index} style={styles.transacaoItem}>
                <Text style={styles.transacaoText}>
                  <Text style={transacao.tipo === 'receita' ? styles.receita : styles.despesa}>
                    R$ {Math.abs(transacao.valor).toFixed(2)}  
                  </Text>{"\n"}
                  <Text style={styles.descricao}>{transacao.descricao}</Text>{"\n"}
                  
                  <Text style={styles.data}>{transacao.data ? new Date(transacao.data).toLocaleDateString() : ''}</Text>
                
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  searchContainer: { flexDirection: 'row', marginBottom: 30 },
  searchInput: { flex: 1, height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10 },
  searchButton: { backgroundColor: '#f0ad4e', paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 10 },
  dashboard: { marginBottom: 20, padding: 20, backgroundColor: '#f9f9f9', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' },
  dashboardItem: { fontSize: 19, marginBottom: 5 },
  receita: { color: 'green', fontSize: 19, marginRight: 10 },
  despesa: { color: 'red', fontSize: 19, marginRight: 10 },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontSize: 19, fontWeight: 'bold', width:'65%', },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 10, borderRadius: 5 },
  button: { backgroundColor: '#F0AD4E', paddingVertical: 12, borderRadius: 5, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  iconButton: { marginRight:35, },
  detailsButton: { backgroundColor: '#919191', paddingVertical: 12, borderRadius: 5, marginTop: 20, alignItems: 'center' },
  detailsButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  buttonOrg: { backgroundColor: '#91919191', paddingVertical: 9, paddingHorizontal: 9, borderRadius: 5, alignItems: 'center', width: '47%' },
  transacoesContainer: { marginBottom: 15, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1 },
 transacaoItem: {
  backgroundColor: '#fff',
  padding: 7,
  marginVertical: 5,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#ddd',
  justifyContent: 'space-between',
  
},

transacaoText: {
  fontSize: 19,
  color: '#333',
  justifyContent: 'space-between',
  lineHeight: 30,
},

descricao: {
  fontSize: 19,
  marginRight: 10, 
},

data: {
  fontSize: 14,
  color: '#777',
 
},

});
