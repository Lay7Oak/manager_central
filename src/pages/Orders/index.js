import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataContext } from '../../Persistence/DataContext'; // Importando o contexto global


export default function Pedidos() {
  const { appData, setAppData } = useContext(DataContext); // Acessando o contexto global
  const [novoPedido, setNovoPedido] = useState({
    id: '',
    cliente: '',
    produto: '',
    data: new Date(),
    quantidade: '',
    valorUnitario: '',
    formaPagamento: '',
    status: 'Aberto',
    descricao: '',
    statusData: new Date(),
  });
  const [busca, setBusca] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState('novos');


  useEffect(() => {
    // Carregar os pedidos armazenados quando o componente for montado
    if (appData?.pedidos) {
      setPedidos(appData.pedidos);
    }
  }, [appData]);

  const [pedidos, setPedidos] = useState(appData?.pedidos || []); // Inicializa a lista de pedidos com os dados carregados

  const formasPagamento = ['Cartão', 'Pix', 'Dinheiro'];
  const produtosCadastrados = appData?.produtos || [];

  const calcularTotal = () => {
  const quantidade = parseFloat(novoPedido.quantidade) || 0;
  const valorUnitario = parseFloat(novoPedido.valorUnitario) || 0;
  return quantidade * valorUnitario;
};

  const adicionarPedido = () => {
    if (!novoPedido.cliente || !novoPedido.produto || !novoPedido.quantidade) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const valorTotal = calcularTotal();
    const pedido = {
      ...novoPedido,
      id: Date.now().toString(),
      valorTotal,
      statusData: new Date(),
    };

    const novosPedidos = [...pedidos, pedido];
    setPedidos(novosPedidos);
    setAppData(prev => ({ ...prev, pedidos: novosPedidos })); // Atualiza os dados no contexto global

    setNovoPedido({
      id: '',
      cliente: '',
      produto: '',
      data: new Date(),
      quantidade: '',
      valorUnitario: '',
      formaPagamento: '',
      status: 'Aberto',
      descricao: '',
    });
  };

  const alterarStatus = (id, novoStatus) => {
  const pedidosAtualizados = pedidos.map(pedido => {
    if (pedido.id === id) {
      // Verifica se o status mudou para "Pago"
      if (novoStatus === 'Pago' && pedido.status !== 'Pago') {
        // Adiciona a receita na lista de transações em appData
        const novaTransacao = {
          tipo: 'receita',
          valor: parseFloat(pedido.valorTotal),
          descricao: `Pedido Pago: ${pedido.cliente}`,
          data: new Date(),
        };
        const novasTransacoes = [...(appData.transacoes || []), novaTransacao];
        setAppData(prev => ({ ...prev, transacoes: novasTransacoes }));
      }
      return { ...pedido, status: novoStatus, statusData: new Date() };
    }
    return pedido;
  });

  setPedidos(pedidosAtualizados);
  setAppData(prev => ({ ...prev, pedidos: pedidosAtualizados })); // Atualiza os pedidos no contexto global
};

 const editarPedido = id => {
  const pedido = pedidos.find(p => p.id === id);
  if (pedido) {
    // Garantir que 'data' seja um objeto Date válido
    const data = new Date(pedido.data); 
    setNovoPedido({
      ...pedido,
      data: data instanceof Date && !isNaN(data) ? data : new Date(),  // Se não for válida, coloca uma data atual
    });
    setPedidos(pedidos.filter(p => p.id !== id));
  }
};


  const pedidosFiltrados = pedidos.filter(pedido =>
    pedido.cliente.toLowerCase().includes(busca.toLowerCase()) ||
    pedido.produto.toLowerCase().includes(busca.toLowerCase()) ||
    pedido.status.toLowerCase().includes(busca.toLowerCase())
  )
    .sort((a, b) => {
    const dateA = new Date(a.data);
    const dateB = new Date(b.data);

    if (ordenarPor === 'novos') {
      return dateB - dateA; // Ordena da data mais recente para a mais antiga
    } else {
      return dateA - dateB; // Ordena da data mais antiga para a mais recente
    }
  });

 const limparLista = () => {
    Alert.alert(
      'Limpar Lista',
      'Tem certeza que deseja limpar a lista de produtos? Os dados serão apagados da lista e mantidos apenas no PDF.',
      [
        { text: 'Cancelar' },
        { 
          text: 'Baixar PDF e Limpar', 
          onPress: () => {
            // integrar a função para gerar o PDF
            setPedidos([]);
            setAppData({ ...appData, pedidos: [] });
          }
        },
      ]
    );
  };

  return (
    <ScrollView >
    <StatusBar backgroundColor="#7A1745" barStyle="light-content" />
    
    <View style={styles.container}>    

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por Cliente, Produto ou Status"
          value={busca}
          onChangeText={text => setBusca(text)} // Atualiza o estado 'busca'
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <TextInput
          placeholder="Cliente"
          style={styles.input}
          value={novoPedido.cliente}
          onChangeText={text => setNovoPedido({ ...novoPedido, cliente: text })}
        />

        {/* Campo de Data com DateTimePicker */}
        <View style={styles.datePickerContainer}>
          <TextInput
            placeholder="Data do Pedido"
            style={styles.inputWithIcon}
            value={novoPedido.data ? novoPedido.data.toLocaleDateString() : ''}
            onFocus={() => setShowDatePicker(true)} // Abre o seletor de data ao focar
            showSoftInputOnFocus={false} // Impede a exibição do teclado
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconButton}>
            <Icon name="calendar" size={20} color="#8b0045" />
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={novoPedido.data || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                setNovoPedido({ ...novoPedido, data: date });
              }
            }}
          />
        )}

        {/* Select de Produtos */}
        <Text style={styles.label}>Produto:</Text>
       <Picker
  selectedValue={novoPedido.produto}
  onValueChange={(itemValue) => {
    const produtoSelecionado = produtosCadastrados.find(p => p.nomeProduto === itemValue);
    setNovoPedido({
      ...novoPedido,
      produto: itemValue,
      valorUnitario: produtoSelecionado ? produtoSelecionado.precoUnitario : '',
    });
  }}
>
  <Picker.Item label="Selecione um produto" value="" />
  {produtosCadastrados.map((produto) => (
    <Picker.Item
      key={produto.id}
      label={`${produto.nomeProduto} (R$${produto.precoUnitario})`}
      value={produto.nomeProduto}
    />
  ))}
</Picker>


        <TextInput
          placeholder="Quantidade"
          style={styles.input}
          keyboardType="numeric"
          value={novoPedido.quantidade}
          onChangeText={text => setNovoPedido({ ...novoPedido, quantidade: text })}
        />

        {/* Exibição do Total */}
        <Text style={styles.total}>
          Total: R$ {calcularTotal().toFixed(2)}
        </Text>

        {/* Select de Forma de Pagamento */}
        <Text style={styles.label}>Forma de Pagamento:</Text>
        <Picker
          selectedValue={novoPedido.formaPagamento}
          onValueChange={itemValue => setNovoPedido({ ...novoPedido, formaPagamento: itemValue })}
          style={styles.dropdown}
        >
          <Picker.Item label="Selecione uma forma de pagamento" value="" />
          {formasPagamento.map(forma => (
            <Picker.Item key={forma} label={forma} value={forma} />
          ))}
        </Picker>

        <TextInput
          placeholder="Descrição"
          style={styles.input}
          value={novoPedido.descricao}
          onChangeText={text => setNovoPedido({ ...novoPedido, descricao: text })}
        />

        <TouchableOpacity style={styles.button} onPress={adicionarPedido}>
          <Text style={styles.buttonText}>Adicionar Pedido</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Lista de Pedidos</Text>
        <View style={styles.containerButtonSmall}  >
          
            <TouchableOpacity style={styles.buttonOrg} onPress={limparLista}>
                 <Text style={styles.buttonText}>Limpar Lista</Text>
                  </TouchableOpacity>
                  
           <TouchableOpacity
              style={styles.buttonOrg}
              onPress={() => setOrdenarPor(ordenarPor === 'novos' ? 'antigos' : 'novos')}
            >
              <Text style={styles.buttonText}>
                {ordenarPor === 'novos' ? 'Ordenar Antigos' : 'Ordenar Novos'}
              </Text>
            </TouchableOpacity>
          </View>

        {pedidosFiltrados.map(pedido => (
          <View key={pedido.id} style={styles.pedido}>
            <Text style={styles.pedidoText}>Cliente: {pedido.cliente}</Text>
            <Text style={styles.pedidoText}>Produto: {pedido.produto}</Text>
            <Text style={styles.pedidoText}>Data: {new Date(pedido.data).toLocaleDateString()}</Text>
            <Text style={styles.pedidoText}>Status Data: {pedido.statusData ? new Date(pedido.statusData).toLocaleDateString() : ''}</Text>
            <Text style={styles.pedidoText}>Quantidade: {pedido.quantidade}</Text>
            <Text style={styles.pedidoText}>Valor Total: R$ {pedido.valorTotal.toFixed(2)}</Text>
            <Text style={styles.pedidoText}>Forma de Pagamento: {pedido.formaPagamento}</Text>
            <Text style={styles.pedidoTextStatus}>Status: {pedido.status}</Text>

           <View style = {styles.containerButtonSmall}>

            <TouchableOpacity
              style={[styles.buttonSmall, styles.editButton]}
              onPress={() => editarPedido(pedido.id)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

             <TouchableOpacity
              style={[styles.buttonSmall, styles.cancelButton]}
              onPress={() => alterarStatus(pedido.id, 'Cancelado')}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

             <TouchableOpacity
              style={[styles.buttonSmall, styles.pagoButton]}
              onPress={() => alterarStatus(pedido.id, 'Pago')}
            >
              <Text style={styles.buttonText}>Concluído</Text>
            </TouchableOpacity>
           
           </View> 
          </View>
        ))}
      </ScrollView>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 10,
  },
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
    backgroundColor: '#7A1745',
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

 
  inputWithIcon: {  borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5, marginRight:10, height: 45},
  datePickerContainer: { flexDirection: 'row', alignItems: 'center' },

  iconButton: {
    padding: 5,
  },

  dropdown: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#7A1745',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff',
    fontWeight: 'bold',
    fontSize:18, },
 
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
  },

buttonOrg: {
    marginTop:20,
    width:'47%',
    backgroundColor: '#A93A6A',
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 5,
    alignItems: 'center',
    margin: '1%',
    textAlign:'center',
  },


  pedido: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

 
  pedidoText:{
    fontSize: 19,
    marginBottom: 5,
  },


  pedidoTextStatus:{
   fontSize:20,
   marginBottom: 30,
   marginTop:9,
  
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
  pagoButton: {
    backgroundColor: '#48bcbe',
  },
  cancelButton: {
    backgroundColor: '#919191',
  },
  editButton: {
    backgroundColor: '#f0ad4e',
  },
  
});


