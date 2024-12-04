import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../../Persistence/DataContext'; 


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
    setProdutos([]); // Garantir que produtos seja um array, caso appData seja undefined
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
      quantidade,
      valorTotal,
      descricao,
    };

    let updatedProdutos = [...produtos];
    if (editingIndex !== null) {
      updatedProdutos[editingIndex] = novoProduto;
    } else {
      updatedProdutos.push(novoProduto);
    }

    setProdutos(updatedProdutos);
    setAppData(prev => ({ ...prev, produtos: updatedProdutos })); 
   
const novaDespesa = {
  tipo: 'despesa',
  valor: -valorTotal, 
  descricao: `Estoque: Compra de ${nomeProduto}`,
  data: new Date(),
};


const novasTransacoes = appData.transacoes ? [...appData.transacoes, novaDespesa] : [novaDespesa];


setAppData(prev => ({ ...prev, transacoes: novasTransacoes }));

    setNomeProduto('');
    setPrecoUnitario('');
    setFornecedor('');
    setDataInsercao('');
    setValidade('');
    setQuantidade('');
    setDescricao('');
    setValorTotal(0);
    setEditingIndex(null);
  } else {
    Alert.alert('Erro', 'Por favor, preencha todos os campos.');
  }
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
            setAppData(prev => ({ ...prev, produtos: produtosAtualizados })); // Atualiza os dados no contexto global
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

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
      'Tem certeza que deseja limpar a lista de produtos? Os dados serão apagados da lista e mantidos apenas no PDF.',
      [
        { text: 'Cancelar' },
        { 
          text: 'Baixar PDF e Limpar', 
          onPress: () => {
            // integrar a função para gerar o PDF - implementação futura
            setProdutos([]);
            setAppData({ ...appData, produtos: [] });
          }
        },
      ]
    );
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

         <TextInput
          placeholder="Nome do Produto"
          value={nomeProduto}
          onChangeText={setNomeProduto}
          style={styles.input}
        />
     
        <View style={styles.row}>
          <TextInput
            placeholder="Preço Unitário"
            keyboardType="numeric"
            value={precoUnitario}
            onChangeText={(value) => {
              setPrecoUnitario(value);
              setValorTotal(calcularValorTotal(quantidade, value));
            }}
            style={styles.inputSmall}
          />
          <TextInput
            placeholder="Quantidade"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={(value) => {
              setQuantidade(value);
              setValorTotal(calcularValorTotal(value, precoUnitario));
            }}
            style={styles.inputSmall}
          />
        </View>

        <TextInput
          placeholder="Fornecedor"
          value={fornecedor}
          onChangeText={setFornecedor}
          style={styles.input}
        />

        <View>
          <View style={styles.datePickerContainer}>
            <TextInput
              placeholder="Data de Inserção"
              value={dataInsercao}
              style={[styles.input, styles.inputWithIcon]}
              editable={false}
            />
            <TouchableOpacity onPress={() => showDatepicker(true)} style={styles.iconContainer}>
              <Icon name="calendar" size={25} color="#8b0045" />
            </TouchableOpacity>
          </View>
          <View style={styles.datePickerContainer}>
            <TextInput
              placeholder="Data de Validade"
              value={validade}
              style={[styles.input, styles.inputWithIcon]}
              editable={false}
            />
            <TouchableOpacity onPress={() => showDatepicker(false)} style={styles.iconContainer}>
              <Icon name="calendar" size={25} color="#8b0045" />
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          style={[styles.input, styles.textarea]}
        />

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
         <View>
         <View style={styles.container3}>
  {produtosFiltrados.map((item, index) => (
    <View key={item.id} style={styles.productItem}>
      <Text style={styles.productText}>Nome: {item.nomeProduto}</Text>
      <Text style={styles.productText}>Preço Unitário: R$ {item.precoUnitario}</Text>
      <Text style={styles.productText}>Fornecedor: {item.fornecedor}</Text>
      <Text style={styles.productText}>Data Inserção: {item.dataInsercao}</Text>
      <Text style={styles.productText}>Validade: {item.validade}</Text>
      <Text style={styles.productText}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.productText}>Valor Total: R$ {item.valorTotal}</Text>
      <Text style={styles.productText}>Descrição: {item.descricao}</Text>
      <View style={styles.productActions}>
        <TouchableOpacity onPress={() => excluirProduto(item.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editarProduto(index)} style={styles.editButton}>
          <Text style={styles.buttonText}>Editar</Text>
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
    </View> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },

  container3:{
    flex: 1,
    padding: 2,
    
  },

 
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize:16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputSmall: {
    width: '48%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },  

   inputWithIcon: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    paddingHorizontal: 30,
    textAlign:'center',
  },

  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  iconContainer: {
    paddingLeft: 10,
    marginRight:22,
  
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
    backgroundColor: '#3d0446',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },
 button: {
    backgroundColor: '#3d0446',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff',
    fontWeight: 'bold',
    fontSize:18, },

   totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },

  textarea: {
    height: 80,
    textAlignVertical: 'top',
  },

  sectionTitle: { fontSize: 21, fontWeight: 'bold', marginTop: 35, textAlign:'center', },

buttonOrg: {
    marginTop:20,
    width:'47%',
    backgroundColor: '#7A3D8A',
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 5,
    alignItems: 'center',
    margin: '1%',
    textAlign:'center',
  },

  productItem: {
    backgroundColor: '#fff',
    padding: 25,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productText: {
    fontSize: 19,
    color: '#333',
    marginBottom: 5,
    
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center', 
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
});



 
