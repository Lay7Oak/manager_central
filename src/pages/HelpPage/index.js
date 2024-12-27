
import styles from './style';
import React from 'react';
import { View, Text, ScrollView, } from 'react-native';

const HelpScreen = () => {
  return (
    <ScrollView>
    <View style={styles.container}>

      <Text style={styles.heading}>Conhecendo o Aplicativo {"\n"} </Text>
      <Text style={styles.subheading}>
        Esta é a página de ajuda do {"\n"}<Text style={[styles.heading, { fontSize: 21 }]}>
          Manager Central (Central do Gerenciador)
        </Text>

        {"\n"}{"\n"}
        Este aplicativo foi desenvolvido para Microempreendedores e Negócios Individuais com o objetivo de ajudar a gerenciar Estoque, 
        Clientes, Pedidos, Serviços e Finanças de forma eficiente, 
        ajudando no dia a dia e no desenvolvimento do negócio. {"\n"} {"\n"}
       
      <Text style={{ fontStyle: 'italic' }}> Esta é uma versão de teste com funcionalidades básicas de gerenciamento. {"\n"}</Text></Text>



      <Text style={styles.heading}>Seção de Login</Text>
      <Text style={styles.subheading}>Na seção de Login, você pode acessar sua conta para utilizar o aplicativo.</Text>
      <Text style={styles.sectionTitle}>1. Inserir Email e Senha:</Text>
      <Text style={styles.text}>Como: Preencha os campos de email e senha com as informações cadastradas.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Acessar" para fazer login na sua conta.</Text>

      <Text style={styles.sectionTitle}>2. Mostrar/Ocultar Senha:</Text>
      <Text style={styles.text}>Como: Clique no ícone de cadeado ao lado do campo de senha para mostrar ou ocultar a senha.</Text>
      <Text style={styles.text}>Ação: O campo de senha será atualizado para exibir ou esconder os caracteres.</Text>

      <Text style={styles.sectionTitle}>3. Esqueceu a Senha:</Text>
      <Text style={styles.text}>Como: Clique no link "Esqueceu a senha?" abaixo do campo de senha.</Text>
      <Text style={styles.text}>Ação: Você será direcionado para a página de recuperação de senha para solicitar a redefinição da sua senha.</Text>

      <Text style={styles.sectionTitle}>4. Cadastro de Nova Conta:</Text>
      <Text style={styles.text}>Como: Clique no link "Não possui uma conta? Cadastre-se!" na parte inferior da tela.</Text>
      <Text style={styles.text}>Ação: Você será direcionado para a página de registro para criar uma nova conta.  {"\n"} {"\n"}
      </Text>
      
      <Text style={styles.heading}>Seção de Recuperação de Senha</Text>
      <Text style={styles.subheading}>Na seção de Recuperação de Senha, você pode solicitar a recuperação da sua senha caso tenha esquecido.</Text>

      <Text style={styles.sectionTitle}>1. Inserir o Email Cadastrado:</Text>
      <Text style={styles.text}>Como: Insira o endereço de email que você usou para se cadastrar no campo de entrada fornecido.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Enviar" para iniciar o processo de recuperação de senha.</Text>

      <Text style={styles.sectionTitle}>2. Receber Instruções de Recuperação:</Text>
      <Text style={styles.text}>Descrição: Se o email informado estiver cadastrado no sistema, você receberá instruções para recuperar sua senha.</Text>
      <Text style={styles.text}>Ação: Siga as instruções enviadas para o seu email para redefinir sua senha. {"\n"} {"\n"}
      <Text style={{ fontStyle: 'italic' }}> Note que esta é uma versão de teste, então você não receberá um email de recuperação. Entre em contato com o responsável pelo teste para resetar sua senha.  {"\n"} {"\n"}</Text></Text>


      <Text style={styles.heading}>Seção de Registro</Text>
      <Text style={styles.subheading}>Na seção de Registro, você pode criar uma nova conta para acessar o aplicativo.</Text>

      <Text style={styles.sectionTitle}>1. Preencher Informações Pessoais:</Text>
      <Text style={styles.text}>Como: Preencha os campos com as informações necessárias, incluindo Nome Completo, Nome do Negócio, Email, Telefone, Senha e Confirmação de Senha.</Text>
      <Text style={styles.text}>Ação: Certifique-se de que todas as informações estão corretas.</Text>

      <Text style={styles.sectionTitle}>2. Mostrar/Ocultar Senha:</Text>
      <Text style={styles.text}>Como: Clique no ícone de cadeado ao lado dos campos de senha e confirmação de senha para mostrar ou ocultar a senha.</Text>
      <Text style={styles.text}>Ação: Os campos de senha serão atualizados para exibir ou esconder os caracteres.</Text>

      <Text style={styles.sectionTitle}>3. Aceitar Termos de Uso e Política de Privacidade:</Text>
      <Text style={styles.text}>Como: Marque a caixa de seleção para aceitar os termos de uso e a política de privacidade.</Text>
      <Text style={styles.text}>Ação: Certifique-se de ler e aceitar os termos antes de prosseguir.</Text>

      <Text style={styles.sectionTitle}>4. Cadastrar:</Text>
      <Text style={styles.text}>Como: Clique no botão "Cadastrar" para criar sua conta.</Text>
      <Text style={styles.text}>Ação: Você será notificado sobre o sucesso do cadastro e direcionado para a página de login.  {"\n"} {"\n"}</Text>


      <Text style={styles.heading}>Página Principal</Text>
      <Text style={styles.subheading}>Na Página Principal, você pode acessar as principais funcionalidades do aplicativo para gerenciar seu negócio.</Text>

      <Text style={styles.sectionTitle}>1. Verificar as Informações do Usuário:</Text>
      <Text style={styles.text}>Como: No topo da página, você verá um texto de saudação e o nome do seu negócio.</Text>
      <Text style={styles.text}>Ação: Clique no ícone de perfil ao lado do seu nome para acessar a página de perfil de usuário e editar suas informações.</Text>

      <Text style={styles.sectionTitle}>2. Navegar para Diferentes Seções:</Text>
      <Text style={styles.text}>Como: Abaixo do texto de saudação, você encontrará vários botões para navegar entre as seções do aplicativo.</Text>
      <Text style={styles.text}>Ação: Clique nos botões correspondentes para acessar as diferentes seções:</Text>

      <Text style={styles.text}>• Estoque: Clique no botão com o ícone de carrinho para gerenciar os produtos no seu estoque.</Text>
      <Text style={styles.text}>• Pedidos: Clique no botão com o ícone de lista para gerenciar os pedidos dos clientes.</Text>
      <Text style={styles.text}>• Clientes: Clique no botão com o ícone de usuários para gerenciar as informações dos seus clientes.</Text>
      <Text style={styles.text}>• Serviços: Clique no botão com o ícone de engrenagem para gerenciar os serviços prestados.</Text>
      <Text style={styles.text}>• Financeiro: Clique no botão com o ícone de cartão de crédito para gerenciar as finanças do seu negócio.</Text>

      <Text style={styles.sectionTitle}>3. Acessar a Ajuda:</Text>
      <Text style={styles.text}>Como: Clique no link "Preciso de Ajuda" para acessar a seção de ajuda e obter informações sobre como usar o aplicativo.</Text>

      <Text style={styles.sectionTitle}>4. Ver Termos de Uso e Política de Privacidade:</Text>
      <Text style={styles.text}>Como: Clique no link "Termos de Uso e Política de Privacidade" para visualizar as políticas do aplicativo.</Text>
      <Text style={styles.text}>Ação: Você será direcionado para a página com os Termos de Uso e Política de Privacidade.  {"\n"} {"\n"}</Text>


      <Text style={styles.heading}>Seção de Perfil de Usuário</Text>
      <Text style={styles.subheading}>Na seção de Perfil de Usuário, você pode gerenciar suas informações pessoais e alterar sua senha.</Text>

      <Text style={styles.sectionTitle}>1. Atualizar Informações Pessoais:</Text>
      <Text style={styles.text}>Como: Preencha os detalhes nos campos fornecidos, incluindo Nome Completo, Nome do Negócio, Email e Telefone.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Salvar Alterações" para atualizar suas informações.</Text>

      <Text style={styles.sectionTitle}>2. Alterar Senha:</Text>
      <Text style={styles.text}>Como: Preencha os campos fornecidos com sua Senha Atual, Nova Senha e Confirmação da Nova Senha. Clique no ícone de olho para mostrar ou esconder a senha conforme necessário.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Alterar Senha" para atualizar sua senha.</Text>

      <Text style={styles.sectionTitle}>3. Cancelar Conta:</Text>
      <Text style={styles.text}>Como: Clique no link "Cancelar Conta".</Text>
      <Text style={styles.text}>Ação: Você receberá um email com as instruções para cancelar sua conta. {"\n"} {"\n"}
      <Text style={{ fontStyle: 'italic' }}>Note que esta é uma versão de teste, então você não receberá um email de cancelamento. Entre em contato com o responsável pelo teste para cancelar sua conta.</Text></Text>

      <Text style={styles.sectionTitle}>4. Sair:</Text>
      <Text style={styles.text}>Como: Clique em "Sair".</Text>
      <Text style={styles.text}>Ação: Você será desconectado do aplicativo.</Text>

      <Text style={styles.sectionTitle}>5. Ver Termos de Uso e Política de Privacidade:</Text>
      <Text style={styles.text}>Como: Clique no link "Termos de Uso e Política de Privacidade".</Text>
      <Text style={styles.text}>Ação: Você será direcionado para a página com os Termos de Uso e Política de Privacidade.  {"\n"} {"\n"}</Text>


      <Text style={styles.heading}>Seção de Estoque</Text>
      <Text style={styles.subheading}>Nesta seção, você pode gerenciar todos os produtos do seu estoque.</Text>

      <Text style={styles.sectionTitle}>1. Adicionar Produto:</Text>
      <Text style={styles.text}>Como: Preencha os detalhes do produto nos campos fornecidos, incluindo Nome, Preço Unitário, Fornecedor, Data de Inserção, Validade, Quantidade e Descrição.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Adicionar Produto" para salvar o novo produto no estoque.</Text>

      <Text style={styles.sectionTitle}>2. Editar Produto:</Text>
      <Text style={styles.text}>Como: Encontre o produto que deseja editar na lista de produtos. Clique no botão "Editar" ao lado do produto. Os detalhes do produto aparecerão nos campos de entrada, permitindo que você faça as alterações necessárias.</Text>
      <Text style={styles.text}>Ação: Clique em "Salvar Edição" para atualizar as informações do produto.</Text>

      <Text style={styles.sectionTitle}>3. Excluir Produto:</Text>
      <Text style={styles.text}>Como: Encontre o produto que deseja excluir na lista. Clique no botão "Excluir" ao lado do produto. Confirme a exclusão quando solicitado.</Text>
      <Text style={styles.text}>Ação: O produto será removido do estoque.</Text>

      <Text style={styles.sectionTitle}>4. Pesquisar Produto:</Text>
      <Text style={styles.text}>Como: Use a barra de pesquisa na parte superior da tela para encontrar produtos específicos. Você pode pesquisar por Nome, Fornecedor, Data de Inserção ou Validade.</Text>
      <Text style={styles.text}>Ação: Os produtos correspondentes à sua busca serão exibidos na lista.</Text>

      <Text style={styles.sectionTitle}>5. Definir Datas:</Text>
      <Text style={styles.text}>Data de Inserção: Clique no ícone de calendário ao lado do campo "Data de Inserção" para selecionar a data.</Text>
      <Text style={styles.text}>Data de Validade: Clique no ícone de calendário ao lado do campo "Data de Validade" para selecionar a data.</Text>

      <Text style={styles.sectionTitle}>Visão Geral da Tela:</Text>
      <Text style={styles.text}>Lista de Produtos: Exibe os produtos cadastrados no estoque com detalhes como nome, preço, fornecedor,
         datas, quantidade, status, valor total e descrição. {"\n"} {"\n"}</Text>

              
      <Text style={styles.heading}>Seção de Pedidos</Text>
      <Text style={styles.subheading}>Na seção de Pedidos, você pode gerenciar todos os pedidos realizados no seu negócio.</Text>

      <Text style={styles.sectionTitle}>1. Adicionar Pedido:</Text>
      <Text style={styles.text}>Como: Preencha os detalhes do pedido nos campos fornecidos, incluindo Cliente, Produto, Data do Pedido, Quantidade, Forma de Pagamento e Descrição.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Adicionar Pedido" para salvar o novo pedido na lista.</Text>

      <Text style={styles.sectionTitle}>2. Editar Pedido:</Text>
      <Text style={styles.text}>Como: Encontre o pedido que deseja editar na lista de pedidos. Clique no botão "Editar" ao lado do pedido. Os detalhes do pedido aparecerão nos campos de entrada, permitindo que você faça as alterações necessárias.</Text>
      <Text style={styles.text}>Ação: Clique em "Adicionar Pedido" para atualizar as informações do pedido.</Text>

      <Text style={styles.sectionTitle}>3. Cancelar Pedido:</Text>
      <Text style={styles.text}>Como: Encontre o pedido que deseja cancelar na lista. Clique no botão "Cancelar" e confirme a ação.</Text>
      <Text style={styles.text}>Ação: O pedido será marcado como cancelado, e a quantidade do produto será ajustada no estoque.</Text>

      <Text style={styles.sectionTitle}>4. Concluir Pedido:</Text>
      <Text style={styles.text}>Como: Encontre o pedido que deseja concluir na lista. Clique no botão "Concluído" ao lado do pedido.</Text>
      <Text style={styles.text}>Ação: O status do pedido será alterado para "Pago."</Text>

      <Text style={styles.sectionTitle}>5. Pesquisar Pedido:</Text>
      <Text style={styles.text}>Como: Use a barra de pesquisa na parte superior da tela para encontrar pedidos específicos. Você pode pesquisar por Cliente, Produto ou Status.</Text>
      <Text style={styles.text}>Ação: Os pedidos correspondentes à sua busca serão exibidos na lista.</Text>

      <Text style={styles.sectionTitle}>6. Ordenar Pedidos:</Text>
      <Text style={styles.text}>Como: Use o botão "Ordenar Novos"/"Ordenar Antigos" para alternar a ordem de exibição dos pedidos.</Text>
      <Text style={styles.text}>Ação: Os pedidos serão ordenados por data, do mais novo para o mais antigo ou vice-versa.</Text>

      <Text style={styles.sectionTitle}>Visão Geral da Tela:</Text>
      <Text style={styles.text}>Lista de Pedidos: Exibe os pedidos cadastrados com detalhes como cliente, produto, data, 
        quantidade, valor total, forma de pagamento, status e descrição. {"\n"} {"\n"}</Text>



      <Text style={styles.heading}>Seção de Clientes</Text>
      <Text style={styles.subheading}>Na seção de Clientes, você pode gerenciar todos os clientes do seu negócio.</Text>

      <Text style={styles.sectionTitle}>1. Adicionar Cliente:</Text>
      <Text style={styles.text}>Como: Preencha os detalhes do cliente nos campos fornecidos, incluindo Nome, Email e Telefone.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Adicionar Cliente" para salvar o novo cliente na lista.</Text>

      <Text style={styles.sectionTitle}>2. Editar Cliente:</Text>
      <Text style={styles.text}>Como: Encontre o cliente que deseja editar na lista de clientes. Clique no botão "Editar". Os detalhes do cliente aparecerão nos campos de entrada, permitindo que você faça as alterações necessárias.</Text>
      <Text style={styles.text}>Ação: Clique em "Salvar Edição" para atualizar as informações do cliente.</Text>

      <Text style={styles.sectionTitle}>3. Excluir Cliente:</Text>
      <Text style={styles.text}>Como: Encontre o cliente que deseja excluir na lista. Clique no botão "Excluir" e confirme a ação.</Text>
      <Text style={styles.text}>Ação: O cliente será removido da lista.</Text>

      <Text style={styles.sectionTitle}>4. Pesquisar Cliente:</Text>
      <Text style={styles.text}>Como: Use a barra de pesquisa na parte superior da tela para encontrar clientes específicos. Você pode pesquisar por Nome, Email ou Telefone.</Text>
      <Text style={styles.text}>Ação: Os clientes correspondentes à sua busca serão exibidos na lista.</Text>

      <Text style={styles.sectionTitle}>5. Ordenar Clientes:</Text>
      <Text style={styles.text}>Como: Use o botão "Ordenar por Nome" para organizar a lista de clientes em ordem alfabética.</Text>
      <Text style={styles.text}>Ação: Os clientes serão ordenados por nome.</Text>

      <Text style={styles.sectionTitle}>Visão Geral da Tela:</Text>
      <Text style={styles.text}>Lista de Clientes: Exibe os clientes cadastrados com detalhes como nome, email e telefone.{"\n"}  {"\n"}
      "Nesta versão de teste, os clientes precisam ser cadastrados manualmente na tela de Clientes. Isso significa que os clientes cadastrados 
      nas telas de Pedidos e Serviços não são automaticamente listados na tela de Clientes e vice-versa." {"\n"}  {"\n"}
      </Text>


      <Text style={styles.heading}>Seção de Serviços</Text>
      <Text style={styles.subheading}>Na seção de Serviços, você pode gerenciar todos os serviços prestados pelo seu negócio.</Text>

      <Text style={styles.sectionTitle}>1. Adicionar Serviço:</Text>
      <Text style={styles.text}>Como: Preencha os detalhes do serviço nos campos fornecidos, incluindo Tipo de Serviço, Descrição, Preço, Data de Solicitação, Data Agendada e Cliente.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Adicionar Serviço" para salvar o novo serviço na lista.</Text>

      <Text style={styles.sectionTitle}>2. Editar Serviço:</Text>
      <Text style={styles.text}>Como: Encontre o serviço que deseja editar na lista de serviços. Clique no botão "Editar" ao lado do serviço. Os detalhes do serviço aparecerão nos campos de entrada, permitindo que você faça as alterações necessárias.</Text>
      <Text style={styles.text}>Ação: Clique em "Salvar Alterações" para atualizar as informações do serviço.</Text>

      <Text style={styles.sectionTitle}>3. Cancelar Serviço:</Text>
      <Text style={styles.text}>Como: Encontre o serviço que deseja cancelar na lista. Clique no botão "Cancelar" ao lado do serviço e confirme a ação. Observe que serviços concluídos não podem ser cancelados.</Text>
      <Text style={styles.text}>Ação: O status do serviço será alterado para "Cancelado."</Text>

      <Text style={styles.sectionTitle}>4. Concluir Serviço:</Text>
      <Text style={styles.text}>Como: Encontre o serviço que deseja concluir na lista. Clique no botão "Concluído" ao lado do serviço.</Text>
      <Text style={styles.text}>Ação: O status do serviço será alterado para "Concluído."</Text>

      <Text style={styles.sectionTitle}>5. Pesquisar Serviço:</Text>
      <Text style={styles.text}>Como: Use a barra de pesquisa na parte superior da tela para encontrar serviços específicos. Você pode pesquisar por Cliente ou Tipo de Serviço.</Text>
      <Text style={styles.text}>Ação: Os serviços correspondentes à sua busca serão exibidos na lista.</Text>

      <Text style={styles.sectionTitle}>6. Ordenar Serviços:</Text>
      <Text style={styles.text}>Como: Use o botão "Ordenar Novos"/"Ordenar Antigos" para alternar a ordem de exibição dos serviços.</Text>
      <Text style={styles.text}>Ação: Os serviços serão ordenados por data de solicitação, do mais novo para o mais antigo ou vice-versa.</Text>

      <Text style={styles.sectionTitle}>Visão Geral da Tela:</Text>
      <Text style={styles.text}>Lista de Serviços: Exibe os serviços cadastrados com detalhes como cliente, tipo de serviço, datas, descrição, preço e status. {"\n"} {"\n"}</Text>


      <Text style={styles.heading}>Seção de Finanças</Text>
      <Text style={styles.subheading}>Na seção de Finanças, você pode gerenciar todas as receitas e despesas do seu negócio, além de registrar receitas ou despesas extras. {"\n"}  {"\n"}
        No painel de Finanças, os valores positivos são destacados em verde, enquanto os negativos aparecem em vermelho.{"\n"}O campo "Lucro" representa a diferença entre os valores
         positivos e negativos: se o resultado for verde, significa que houve lucro; se for vermelho, indica que o negócio está em débito, ou seja, não houve lucro.</Text>

      <Text style={styles.sectionTitle}>1. Adicionar Receita Extra:</Text>
      <Text style={styles.text}>Como: Preencha os detalhes da receita nos campos fornecidos, incluindo Valor e Descrição. Clique no calendário para registrar a data.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Adicionar Receita" para salvar a nova receita na lista.</Text>

      <Text style={styles.sectionTitle}>2. Adicionar Gasto Extra:</Text>
      <Text style={styles.text}>Como: Preencha os detalhes do gasto nos campos fornecidos, incluindo Valor e Descrição. Clique no calendário para registrar a data.</Text>
      <Text style={styles.text}>Ação: Clique no botão "Adicionar Gasto" para salvar o novo gasto na lista.</Text>

      <Text style={styles.sectionTitle}>3. Pesquisar Transações:</Text>
      <Text style={styles.text}>Como: Use a barra de pesquisa na parte superior da tela para encontrar transações específicas. Você pode pesquisar por Receita, Despesa ou Valor.</Text>
      <Text style={styles.text}>Ação: As transações correspondentes à sua busca serão exibidas na lista.</Text>

      <Text style={styles.sectionTitle}>4. Ordenar Transações:</Text>
      <Text style={styles.text}>Como: Use o botão "Ordenar Novo"/"Ordenar Antigo" para alternar a ordem de exibição das transações.</Text>
      <Text style={styles.text}>Ação: As transações serão ordenadas por data, do mais novo para o mais antigo ou vice-versa.</Text>

      <Text style={styles.sectionTitle}>5. Exibir Detalhes:</Text>
      <Text style={styles.text}>Como: Use o botão "Mostrar Detalhes"/"Ocultar Detalhes" para exibir ou esconder as transações detalhadas.</Text>
      <Text style={styles.text}>Ação: Os detalhes das transações serão exibidos ou ocultados conforme sua preferência.</Text>

      <Text style={styles.sectionTitle}>Visão Geral da Tela:</Text>
      <Text style={styles.text}>Lista de Transações: Exibe as transações cadastradas e realizadas em Pedidos, Serviços e Estoque, 
        com detalhes como tipo, valor, descrição e data. {"\n"} {"\n"}</Text>


      <Text style={styles.heading}>Limpar Lista e Gerar Relatório em PDF</Text>
      <Text style={styles.subheading}>Todos os serviços possuem esta opção.</Text>
            <Text style={styles.text}>Como: Clique no botão "Limpar lista" para gerar um relatório PDF. Escolha salvar ou compartilhar o PDF para garantir que os dados não sejam perdidos.</Text>
      <Text style={styles.text}>Ação: O relatório em PDF será gerado e a lista será limpa apagando os dados do aplicativo. {"\n"} {"\n"}</Text>


      <Text style={styles.heading}>Contato</Text>
      <Text style={styles.subheading}>Se precisar de mais informações ou assistência durante o teste do aplicativo, entre em contato com o responsável pelo teste via WhatsApp ou Telegram.</Text>

      <Text style={styles.sectionTitle}>1. WhatsApp:</Text>
      <Text style={styles.text}>Como: Envie uma mensagem para o número de WhatsApp fornecido a você pelo responsável pelo teste.</Text>
      <Text style={styles.text}>Ação: O responsável pelo teste responderá o mais rápido possível.</Text>

      <Text style={styles.sectionTitle}>2. Telegram:</Text>
      <Text style={styles.text}>Como: Envie uma mensagem para o contato de Telegram fornecido a você pelo responsável pelo teste.</Text>
      <Text style={styles.text}>Ação: O responsável pelo teste responderá o mais rápido possível.</Text>


      </View>
      </ScrollView>
  );
};

export default HelpScreen;



