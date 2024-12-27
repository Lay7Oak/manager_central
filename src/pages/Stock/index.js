import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../../Persistence/DataContext';
import styles from './style';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

  export default function Stock() {
  const { appData, setAppData } = useContext(DataContext); 
  const [produtos, setProdutos] = useState(appData?.produtos || []); 
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [dataInsercao, setDataInsercao] = useState('');
  const [validade, setValidade] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorTotal, setValorTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDataInsercao, setIsDataInsercao] = useState(true);
 
  useEffect(() => {
  if (appData?.produtos) {
    setProdutos(appData.produtos);
  } else {
    setProdutos([]);
  }
}, [appData]);

  const calcularValorTotal = (quantidade, precoUnitario) => {
    const preco = parseFloat(precoUnitario.replace(',', '.')); 
    return quantidade && preco ? quantidade * preco : 0;
  };
  const adicionarOuEditarProduto = () => {
    if (nomeProduto && precoUnitario && fornecedor && quantidade && descricao) {
      const novoProduto = {
        id: editingIndex !== null ? produtos[editingIndex].id : Date.now(),
        nomeProduto,
        precoUnitario,
        fornecedor,
        dataInsercao,
        validade,
        quantidade: parseInt(quantidade, 10),
        valorTotal,
        descricao,
        status: quantidade > 0 ? "Disponível" : "Indisponível",
      };
  
      let updatedProdutos = [...produtos];
      if (editingIndex !== null) {
        updatedProdutos[editingIndex] = novoProduto;
  
        const updatedTransacoes = appData.transacoes.map((transacao) => {
          if (transacao.descricao.includes(novoProduto.nomeProduto)) {
    
            return {
              ...transacao,
              valor: -novoProduto.valorTotal,
              descricao: `Estoque: Compra de ${novoProduto.nomeProduto}`,
            };
          }
          return transacao;
        });
  
        setAppData((prev) => ({ ...prev, transacoes: updatedTransacoes }));
      } else {
  
        updatedProdutos.unshift(novoProduto);
  
        const novaDespesa = {
          tipo: "despesa",
          valor: -valorTotal,
          descricao: `Estoque: Compra de ${nomeProduto}`,
          data: new Date(),
        };
  
        const novasTransacoes = appData.transacoes
          ? [novaDespesa, ...appData.transacoes]
          : [novaDespesa];
  
        setAppData((prev) => ({ ...prev, transacoes: novasTransacoes }));
      }
  
      setProdutos(updatedProdutos);
      setAppData((prev) => ({ ...prev, produtos: updatedProdutos }));
      resetForm();
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };
  
  const resetForm = () => {
    setNomeProduto("");
    setPrecoUnitario("");
    setFornecedor("");
    setDataInsercao("");
    setValidade("");
    setQuantidade("");
    setDescricao("");
    setValorTotal(0);
    setEditingIndex(null);
  };
    
    const pesquisarProduto = (query) => {
    setSearchQuery(query);
  };

 const produtosFiltrados = Array.isArray(produtos) ? produtos.filter((produto) =>
  produto.nomeProduto.toLowerCase().includes(searchQuery.toLowerCase()) ||
  produto.fornecedor.toLowerCase().includes(searchQuery.toLowerCase()) ||
  produto.validade.toLowerCase().includes(searchQuery.toLowerCase()) ||
  produto.dataInsercao.toLowerCase().includes(searchQuery.toLowerCase())
) : [];

  const editarProduto = (index) => {
    const produto = produtos[index];
    setNomeProduto(produto.nomeProduto);
    setPrecoUnitario(produto.precoUnitario);
    setFornecedor(produto.fornecedor);
    setDataInsercao(produto.dataInsercao);
    setValidade(produto.validade);
    setQuantidade(produto.quantidade);
    setDescricao(produto.descricao);
    setValorTotal(produto.valorTotal);
    setEditingIndex(index);
  };

  const excluirProduto = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            const produtosAtualizados = produtos.filter((produto) => produto.id !== id);
            setProdutos(produtosAtualizados);
            setAppData(prev => ({ ...prev, produtos: produtosAtualizados })); 
          },
          style: 'destructive',        },      ],
      { cancelable: true }    );  };

  const showDatepicker = (isDataInsercao) => {
    setIsDataInsercao(isDataInsercao);
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    if (isDataInsercao) {
      setDataInsercao(currentDate.toLocaleDateString());
    } else {
      setValidade(currentDate.toLocaleDateString());
    }
    setShowDatePicker(false);
  };

  const limparLista = () => {
    Alert.alert(
      'Limpar Lista',
      'Tem certeza que deseja limpar a lista de produtos? Os dados serão apagados da lista e mantidos apenas no PDF. Por favor, escolha salvar ou compartilhar o PDF para garantir que os dados não sejam perdidos.',
      [
        { text: 'Cancelar' },
        { 
          text: 'Baixar PDF e Limpar', 
          onPress: async () => {
            await generatePDF();
            setProdutos([]);
            setAppData({ ...appData, produtos: [] });
          }
        },
      ]
    );
  };
const realizarPedido = (produtoId, quantidadePedido) => {
  const updatedProdutos = produtos.map((produto) => {
    if (produto.id === produtoId) {
      const novaQuantidade = produto.quantidade - quantidadePedido;
      return {
        ...produto,
        quantidade: novaQuantidade > 0 ? novaQuantidade : 0,
        status: novaQuantidade > 0 ? "Disponível" : "Indisponível",      };    }
    return produto;  });
  setProdutos(updatedProdutos);
  setAppData((prev) => ({ ...prev, produtos: updatedProdutos }));
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
        <h1>Lista de Produtos no Estoque</h1>
        <ul> 
          ${produtos.map(produto => ` 
            <li> 
              <strong>Nome do Produto:</strong> ${produto.nomeProduto} <br />
              <strong>Preço Unitário:</strong> ${produto.precoUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br /> 
              <strong>Fornecedor:</strong> ${produto.fornecedor} <br />
              <strong>Data de Inserção:</strong> ${produto.dataInsercao} <br />
              <strong>Validade:</strong> ${produto.validade} <br />
              <strong>Quantidade:</strong> ${produto.quantidade} <br />
              <strong>Valor Total:</strong> ${produto.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br />
              <strong>Descrição:</strong> ${produto.descricao} <br />
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
    <StatusBar backgroundColor="#3d0446" barStyle="light-content" />    
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar Produto; Fornecedor; Validade; Inserção"
          value={searchQuery}
          onChangeText={pesquisarProduto}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.totalText}>Adicionar Produtos</Text>
      <TextInput
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
        style={styles.input}      />
     
      <View style={styles.row}>
        <TextInput
          placeholder="Preço Unitário"
          keyboardType="numeric"
          value={precoUnitario}
          onChangeText={(value) => {
            setPrecoUnitario(value);
            setValorTotal(calcularValorTotal(quantidade, value));
          }}
          style={styles.inputSmall}        />
        <TextInput
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={(value) => {
            setQuantidade(value);
            setValorTotal(calcularValorTotal(value, precoUnitario));
          }}
          style={styles.inputSmall}        />
      </View>
      <TextInput
        placeholder="Fornecedor"
        value={fornecedor}
        onChangeText={setFornecedor}
        style={styles.input}      />
      <View>
        <View style={styles.datePickerContainer}>
          <TextInput
            placeholder="Data de Inserção"
            value={dataInsercao}
            style={[styles.input, styles.inputWithIcon]}
            editable={false}          />
          <TouchableOpacity onPress={() => showDatepicker(true)} style={styles.iconContainer}>
            <Icon name="calendar" size={25} color="#7A3D8A"  />
          </TouchableOpacity>
        </View>
        <View style={styles.datePickerContainer}>
          <TextInput
            placeholder="Data de Validade"
            value={validade}
            style={[styles.input, styles.inputWithIcon]}
            editable={false}          />
          <TouchableOpacity onPress={() => showDatepicker(false)} style={styles.iconContainer}>
            <Icon name="calendar" size={25} color="#7A3D8A" />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, styles.textarea]}      />
      <Text style={styles.totalText}>Valor Total: R$ {valorTotal.toFixed(2)}</Text>
      <TouchableOpacity style={styles.button} onPress={adicionarOuEditarProduto}>
        <Text style={styles.buttonText}>
          {editingIndex !== null ? 'Salvar Edição' : 'Adicionar Produto'}
        </Text>
      </TouchableOpacity>
      <View>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Lista de Produtos</Text>
          <TouchableOpacity style={styles.buttonOrg} onPress={limparLista}>
            <Text style={styles.buttonText}>Limpar Lista</Text>
          </TouchableOpacity>          
        </View>
        <View style={styles.container3}>
          {produtosFiltrados.map((item, index) => (
            <View key={item.id} style={styles.productItem}>
              <Text style={styles.productText}>Nome: {item.nomeProduto}</Text>
              <Text style={styles.productText}>Preço Unitário: R$ {item.precoUnitario}</Text>
              <Text style={styles.productText}>Fornecedor: {item.fornecedor}</Text>
              <Text style={styles.productText}>Data Inserção: {item.dataInsercao}</Text>
              <Text style={styles.productText}>Validade: {item.validade}</Text>
              <Text style={styles.productText}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.productText}>Status: {item.status}</Text>
              <Text style={styles.productText}>Valor Total: R$ {item.valorTotal.toFixed(2)}</Text>
              <Text style={styles.productText}>Descrição: {item.descricao}</Text>
              <View style={styles.productActions}>
              <TouchableOpacity onPress={() => editarProduto(index)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => excluirProduto(item.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
                
              
              </View>
            </View>
          ))}
        </View>
      </View>
      {showDatePicker && (
        <DateTimePicker value={new Date()} mode="date" display="default" onChange={onDateChange} />
      )}
    </View> 
  </ScrollView>
);
}
