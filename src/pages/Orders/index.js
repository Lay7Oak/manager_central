import React, { useState, useContext, useEffect } from 'react';
import {  View,  Text,  TextInput,  TouchableOpacity, ScrollView,  Alert,  StatusBar} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataContext } from '../../Persistence/DataContext';
import styles from './style';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

  export default function Pedidos() {
  const { appData, setAppData } = useContext(DataContext); 
  const [novoPedido, setNovoPedido] = useState({
    id: '',
    cliente: '',
    produto: '',
    data: new Date(),
    quantidade: '',
    valorRevenda: '',
    formaPagamento: '',
    status: 'Aberto',
    descricao: '',
    statusData: new Date(),
  });
  const [busca, setBusca] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState('novos');


  useEffect(() => {
    if (appData?.pedidos) {
      setPedidos(appData.pedidos);
    }
  }, [appData]);

  const [pedidos, setPedidos] = useState(appData?.pedidos || []);
  const formasPagamento = ['Cartão', 'Pix', 'Dinheiro'];
  const produtosCadastrados = appData?.produtos || [];
  const produtosDisponiveis = produtosCadastrados.filter(produto => produto.quantidade > 0);
  const calcularTotal = () => {
  const quantidade = parseFloat(novoPedido.quantidade) || 0;
  const valorRevenda = parseFloat(novoPedido.valorRevenda.replace(',', '.')) || 0;
  return quantidade * valorRevenda;
};
const adicionarPedido = () => {
  if (!novoPedido.cliente || !novoPedido.produto || !novoPedido.quantidade) {
    Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
    return;
  }
  const produtoSelecionado = produtosCadastrados.find(p => p.nomeProduto === novoPedido.produto);
  if (produtoSelecionado && novoPedido.quantidade > produtoSelecionado.quantidade) {
    Alert.alert('Erro', `A quantidade disponível de ${produtoSelecionado.nomeProduto} é ${produtoSelecionado.quantidade}.`);
    return;
  }
  const valorTotal = calcularTotal();
  const pedido = {
    ...novoPedido,
    id: Date.now().toString(),
    valorTotal,
    statusData: new Date(),
  };
  const updatedProdutos = produtosCadastrados.map(produto => {
    if (produto.nomeProduto === pedido.produto) {
      const novaQuantidade = produto.quantidade - pedido.quantidade;
      return {
        ...produto,
        quantidade: novaQuantidade > 0 ? novaQuantidade : 0,
        status: novaQuantidade > 0 ? "Disponível" : "Indisponível",
      };
    }
    return produto;
  });

  setAppData(prev => ({ ...prev, produtos: updatedProdutos }));

  const novosPedidos = [...pedidos, pedido];
  setPedidos(novosPedidos);
  setAppData(prev => ({ ...prev, pedidos: novosPedidos })); 

  setNovoPedido({
    id: '',
    cliente: '',
    produto: '',
    data: new Date(),
    quantidade: '',
    valorRevenda: '',
    formaPagamento: '',
    status: 'Aberto',
    descricao: '',
  });
};
  const alterarStatus = (id, novoStatus) => {
  const pedidosAtualizados = pedidos.map(pedido => {
    if (pedido.id === id) {
      if (novoStatus === 'Pago' && pedido.status !== 'Pago') {
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
  setAppData(prev => ({ ...prev, pedidos: pedidosAtualizados }));
};

const editarPedido = id => {
  const pedido = pedidos.find(p => p.id === id);
  if (pedido) {
    if (pedido.status !== 'Aberto') {
      Alert.alert('Ação não permitida', 'Somente pedidos com status "Aberto" podem ser editados.');
      return; 
    }

    const data = new Date(pedido.data);
    setNovoPedido({
      ...pedido,
      data: data instanceof Date && !isNaN(data) ? data : new Date(), 
    });
  }
};

const salvarAlteracoes = () => {
 
  const pedidoAlterado = novoPedido;

  
  const produtoAnterior = pedidos.find(p => p.id === pedidoAlterado.id);
  if (produtoAnterior) {
    const produtoSelecionado = produtosCadastrados.find(p => p.nomeProduto === pedidoAlterado.produto);
    
    const quantidadeAnterior = parseFloat(produtoAnterior.quantidade) || 0;
    const quantidadeAlterada = parseFloat(pedidoAlterado.quantidade) || 0;

    const quantidadeDisponivel = produtoSelecionado ? produtoSelecionado.quantidade : 0;

    
    const quantidadeMaximaPermitida = quantidadeAnterior + quantidadeDisponivel;

    if (quantidadeAlterada > quantidadeMaximaPermitida) {
      
      Alert.alert(
        'Erro',
        `A quantidade disponível de ${produtoSelecionado.nomeProduto} é ${quantidadeDisponivel}. Você pode adicionar no máximo ${quantidadeMaximaPermitida} unidades no total.`
      );

      setNovoPedido(prev => ({
        ...prev,
        quantidade: quantidadeMaximaPermitida.toString(), 
      }));

      return;
    }

    const novaQuantidadeProduto = produtoSelecionado ? produtoSelecionado.quantidade - (quantidadeAlterada - quantidadeAnterior) : 0;
    const statusProduto = novaQuantidadeProduto > 0 ? 'Disponível' : 'Indisponível';

   
    const updatedProdutos = produtosCadastrados.map(produto => {
      if (produto.nomeProduto === pedidoAlterado.produto) {
        return { ...produto, quantidade: novaQuantidadeProduto, status: statusProduto };
      }
      return produto;
    });

    setAppData(prev => ({ ...prev, produtos: updatedProdutos }));
  }

  const valorTotal = calcularTotal();


  const novosPedidos = pedidos.map(p => p.id === pedidoAlterado.id ? { ...pedidoAlterado, valorTotal, statusData: new Date() } : p);
  
  
  setPedidos(novosPedidos);
  setAppData(prev => ({ ...prev, pedidos: novosPedidos }));

  setNovoPedido({
    id: '',
    cliente: '',
    produto: '',
    data: new Date(),
    quantidade: '',
    valorRevenda: '',
    formaPagamento: '',
    status: 'Aberto',
    descricao: '',
  });
};


const cancelarPedido = (id) => {
  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return;

  const updatedProdutos = appData.produtos.map(produto => {
    if (produto.nomeProduto === pedido.produto) {
      const novaQuantidade = Number(produto.quantidade) + Number(pedido.quantidade);
      return {
        ...produto,
        quantidade: novaQuantidade,
        status: novaQuantidade > 0 ? 'Disponível' : produto.status,
      };
    }
    return produto;
  });
  setAppData(prev => ({ ...prev, produtos: updatedProdutos }));

  const novasTransacoes = (appData.transacoes || []).map(transacao => {
    if (
      transacao.descricao === `Pedido Pago: ${pedido.cliente}` &&
      transacao.valor === parseFloat(pedido.valorTotal)
    ) {
     
      if (pedido.status === 'Pago') {
        return {
          ...transacao,
          descricao: `${transacao.descricao} (Cancelado)`,
          valor: transacao.valor - parseFloat(pedido.valorTotal), 
        };
      }
    }
    return transacao;
  });

  setAppData(prev => ({ ...prev, transacoes: novasTransacoes }));

  const pedidosAtualizados = pedidos.map(p =>
    p.id === id ? { ...p, status: 'Cancelado', statusData: new Date() } : p
  );
  setPedidos(pedidosAtualizados);
  setAppData(prev => ({ ...prev, pedidos: pedidosAtualizados }));
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
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const limparLista = () => {
    Alert.alert(
      'Limpar Lista',
      'Tem certeza que deseja limpar a lista de pedidos? Os dados serão apagados da lista e mantidos apenas no PDF. Por favor, escolha salvar ou compartilhar o PDF para garantir que os dados não sejam perdidos.',
      [
        { text: 'Cancelar' },
        { 
          text: 'Baixar PDF e Limpar', 
          onPress: async () => {
            await generatePDF();
            setPedidos([]);
            setAppData({ ...appData, pedidos: [] });
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
                    <h1>Lista de Pedidos</h1>
                    <ul> 
                      ${pedidos.map(pedido => ` 
                        <li> 
                          <strong>Cliente:</strong> ${pedido.cliente} <br />
                          <strong>Produto:</strong> ${pedido.produto} <br /> 
                          <strong>Quantidade:</strong> ${pedido.quantidade} <br />
                          <strong>Valor Revenda:</strong> ${pedido.valorRevenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br />
                          <strong>Valor Total:</strong> ${pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br />
                          <strong>Forma de Pagamento:</strong> ${pedido.formaPagamento} <br />
                          <strong>Status:</strong> ${pedido.status} <br />
                          <strong>Data:</strong> ${new Date(pedido.data).toLocaleDateString()} <br />
                          <strong>Descrição:</strong> ${pedido.descricao} <br /> <br /><br />
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
    <StatusBar backgroundColor="#7A1745" barStyle="light-content" />
    <View style={styles.container}>    
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por Cliente, Produto ou Status"
          value={busca}
          onChangeText={text => setBusca(text)}        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.total}>Adicionar Pedidos </Text>
      <ScrollView style={styles.scrollView}>
        <TextInput
          placeholder="Cliente"
          style={styles.input}
          value={novoPedido.cliente}
          onChangeText={text => setNovoPedido({ ...novoPedido, cliente: text })}        />
        <View style={styles.datePickerContainer}>
          <TextInput
            placeholder="Data do Pedido"
            style={styles.inputWithIcon}
            value={novoPedido.data ? novoPedido.data.toLocaleDateString() : ''}
            onFocus={() => setShowDatePicker(true)}
            showSoftInputOnFocus={false}       />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconButton}>
            <Icon name="calendar" size={25} color="#A93A6A" />
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
                setNovoPedido({ ...novoPedido, data: date });       }     }}       />    )}
        <Text style={styles.label}>Produto:</Text>
        <Picker
          selectedValue={novoPedido.produto}
          onValueChange={(itemValue) => {
            const produtoSelecionado = produtosDisponiveis.find(p => p.nomeProduto === itemValue);
            setNovoPedido({
              ...novoPedido,
              produto: itemValue,
              valorRevenda: produtoSelecionado ? produtoSelecionado.precoRevenda : '',     });    }}     >
          <Picker.Item label="Selecione um produto" value="" />
          {produtosDisponiveis.map((produto) => (
            <Picker.Item
              key={produto.id}
              label={`${produto.nomeProduto} (R$${produto.precoRevenda})`}    value={produto.nomeProduto}    />   ))}
        </Picker>
        <TextInput
          placeholder="Quantidade"
          style={styles.input}
          keyboardType="numeric"
          value={novoPedido.quantidade}
          onChangeText={text => setNovoPedido({ ...novoPedido, quantidade: text })}  />
        <Text style={styles.total}> Total: R$ {calcularTotal().toFixed(2)}   </Text>
        <Text style={styles.label}>Forma de Pagamento:</Text>
        <Picker
          selectedValue={novoPedido.formaPagamento}
          onValueChange={itemValue => setNovoPedido({ ...novoPedido, formaPagamento: itemValue })}    style={styles.dropdown}   >
          <Picker.Item label="Selecione uma forma de pagamento" value="" />
          {formasPagamento.map(forma => (
            <Picker.Item key={forma} label={forma} value={forma} /> ))}
        </Picker>

        <TextInput
          placeholder="Descrição"
          style={styles.input}
          value={novoPedido.descricao}
          onChangeText={text => setNovoPedido({ ...novoPedido, descricao: text })} />
       <TouchableOpacity
            style={styles.button}
            onPress={novoPedido.id ? salvarAlteracoes : adicionarPedido}>
            <Text style={styles.buttonText}>
              {novoPedido.id ? 'Salvar Alterações' : 'Adicionar Pedido'}
            </Text>
          </TouchableOpacity>

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Lista de Pedidos</Text>
        <View style={styles.containerButtonSmall}>
          <TouchableOpacity style={styles.buttonOrg} onPress={limparLista}>
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
        {pedidosFiltrados.map(pedido => (
          <View key={pedido.id} style={styles.pedido}>
            <Text style={styles.pedidoText}>Cliente: {pedido.cliente}</Text>
            <Text style={styles.pedidoText}>Produto: {pedido.produto}</Text>
            <Text style={styles.pedidoText}>Data: {new Date(pedido.data).toLocaleDateString()}</Text>
            <Text style={styles.pedidoText}>Status Data: {pedido.statusData ? new Date(pedido.statusData).toLocaleDateString() : ''}</Text>
            <Text style={styles.pedidoText}>Quantidade: {pedido.quantidade}</Text>
            <Text style={styles.pedidoText}>Valor Total: R$ {pedido.valorTotal.toFixed(2)}</Text>
            <Text style={styles.pedidoText}>Forma de Pagamento: {pedido.formaPagamento}</Text>
            <Text style={styles.pedidoText}>Descrição: {pedido.descricao}</Text>
            <Text style={styles.pedidoTextStatus}>Status: {pedido.status}</Text>
            <View style={styles.containerButtonSmall}>

            <TouchableOpacity
                style={[styles.buttonSmall, styles.editButton]}
                onPress={() => editarPedido(pedido.id)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonSmall, styles.cancelButton]}
                onPress={() => {
                  Alert.alert(
                    'Cancelar Pedido',
                    `Tem certeza que deseja cancelar o pedido de ${pedido.produto}?`,
                    [
                      { text: 'Não', style: 'cancel' },
                      {
                        text: 'Sim',
                        onPress: () => {
                          alterarStatus(pedido.id, 'Cancelado');
                          cancelarPedido(pedido.id);
                        },
                      },
                    ]
                  );
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonSmall, styles.pagoButton]}
                onPress={() => {
                  if (pedido.status === 'Aberto') {
                    alterarStatus(pedido.id, 'Pago');
                  } else {
                    Alert.alert(
                      'Ação Não Permitida',
                      'Realize um novo pedido',
                      [{ text: 'OK', style: 'cancel' }]
                    );
                  }
                }}
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