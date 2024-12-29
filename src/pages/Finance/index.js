import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataContext } from '../../Persistence/DataContext'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './style';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


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
      'Tem certeza que deseja limpar a lista de transações? Os dados serão apagados da lista e mantidos apenas no PDF. Por favor, escolha salvar ou compartilhar o PDF para garantir que os dados não sejam perdidos.',
      [
        { text: 'Cancelar' },
        { 
          text: 'Baixar PDF e Limpar', 
          onPress: async () => {
            await generatePDF();
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
              margin-bottom: 20px; /* Ajuste o valor para o espaçamento desejado */
            }
          </style>
        </head>
        <body> 
          <h1>Lista de Transações</h1>
          <ul> 
            ${transacoes.map(transacao => ` 
              <li> 
                <strong>Tipo:</strong> ${transacao.tipo} <br />
                <strong>Valor:</strong> ${transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br /> 
                <strong>Descrição:</strong> ${transacao.descricao} <br />
                <strong>Data:</strong> ${new Date(transacao.data).toLocaleDateString('pt-BR')} <br /><br /><br />
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
    <ScrollView>
      <StatusBar backgroundColor="#33808a" barStyle="light-content" />
    
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

        <Text style={styles.total}>Painel de Finanças</Text>

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
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Adicionar Receita Extra</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconButton}>
              <Icon name="calendar" size={25} color="#919191" />
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
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Adicionar Gasto Extra</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconButton}>
              <Icon name="calendar" size={25} color="#919191" />
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
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => setMostrarDetalhes(!mostrarDetalhes)}
        >
          <Text style={styles.detailsButtonText}>
            {mostrarDetalhes ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
          </Text>
        </TouchableOpacity>
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
