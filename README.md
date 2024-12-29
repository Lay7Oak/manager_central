# Manager Central (Central do Gerenciador)

Manager Central é um aplicativo desenvolvido para gerenciar pequenos negócios de forma simples e eficiente.  
Esta é uma versão beta focada em testes, com o objetivo de coletar feedback dos usuários sobre a experiência, funcionalidades e usabilidade. O aplicativo foi projetado para atender diversos perfis, desde MEIs e estabelecimentos formais até revendedores e autônomos.

---

## Funcionalidades Principais

### 1. **Tela de Estoque**
- Cadastro de produtos com os seguintes campos:
  - Nome do produto
  - Preço unitário
  - Quantidade
  - Fornecedor
  - Data de inserção
  - Data de validade
  - Descrição
  - Valor total calculado automaticamente
- Produtos cadastrados ficam automaticamente disponíveis na Aba de Pedidos.
- Controle de estoque com limite de vendas conforme a quantidade disponível.

### 2. **Tela de Pedidos**
- Cadastro de pedidos com os seguintes campos:
  - Nome do cliente
  - Data do pedido
  - Seleção do produto
  - Quantidade
  - Forma de pagamento
  - Valor total calculado automaticamente
  - Descrição
- Gerenciamento do status do pedido:
  - **Aberto**: Pendente de pagamento
  - **Concluído**: Pago
  - **Cancelado**: Não realizado

### 3. **Tela de Serviços**
- Registro de serviços com os seguintes campos:
  - Tipo de serviço (ex: Manutenção, Instalação, Limpeza, etc.)
  - Data da solicitação
  - Data agendada
  - Descrição do serviço
  - Preço
  - Nome do cliente
- Gerenciamento do status do serviço:
  - **Aberto**: Pendente
  - **Concluído**: Finalizado
  - **Cancelado**: Não realizado

### 4. **Tela de Clientes**
- Cadastro de clientes com os seguintes campos:
  - Nome do cliente
  - E-mail
  - Telefone
- Nota: Clientes cadastrados não são vinculados automaticamente a outras abas nesta versão.

### 5. **Tela de Finanças**
- Painel com os seguintes dados:
  - **Receitas**: Valores de pedidos concluídos, serviços concluídos e receitas extras
  - **Despesas**: Valores de produtos cadastrados no estoque e despesas extras
  - **Lucro ou Prejuízo**: Calculado automaticamente (Receitas - Despesas)
      - Lucro exibido em verde
      - Prejuízo exibido em vermelho
- Adição de Receita Extra e Gasto Extra para ajustes manuais.
- Visualização detalhada de receitas e despesas na Aba de Detalhes.

### 6. **Funcionalidades Gerais**
- Barra de pesquisa em todas as abas.
- Opção de limpar listas e gerar PDF para backup dos dados.
- Interface amigável com cores associadas a cada aba para facilitar a memorização.

### 7. **Tela do Usuário**
- Edição de informações do usuário:
  - Nome
  - Nome do negócio
  - Telefone
- Troca de senha com validação da senha atual.
- Envio de feedback sobre o aplicativo.
- Opção de sair do app ou cancelar a conta (apenas via contato com o responsável na versão atual).

### 8. **Tela de Ajuda e Termos de Uso**
- Disponíveis em várias telas do aplicativo:
  - Tela principal
  - Tela de login
  - Tela de recuperação de senha
  - Tela de cadastro

---

## Tecnologias Utilizadas
- **Frontend**: React Native com Expo
- **Backend**: Firebase
- **Build**: Versão .apk construída com **EAS (Expo Application Services)**.
- **Exportação de Dados**: PDF

---

## Sobre o Desenvolvimento
Este projeto foi criado por mim, **Laís Carvalho**, com a colaboração de **[Fabrício Vieira](https://github.com/vieira-fabricio)**, desenvolvedor backend e amigo que me ajudou com a implementação da lógica e de alguns serviços, além de contribuir na escolha dos serviços e funcionalidades que seriam disponibilizados nesta versão e das funcionalidades que serão implementadas futuramente. O projeto começou como um trabalho de extensão e se transformou em um objetivo pessoal para ambos.

---

## Disponibilidade
- Esta versão de teste está disponível no formato **.apk** para usuários selecionados.  
- O feedback será utilizado para melhorar a experiência e funcionalidades em versões futuras.

---

## Limitações da Versão Beta
- Dados armazenados localmente (não há resgate por e-mail).
- Clientes cadastrados não são vinculados automaticamente a pedidos e serviços.
- Cancelamento de conta e Redefinição de senha somente através de contato com o responsável.
- Não é possível gerar PDF sem limpar a lista.

---

## Planejamento Futuro
- Vinculação automática de clientes entre abas.
- Migração para armazenamento em nuvem.
- Otimização do layout com ícones e personalização.
- Implementação de novas funcionalidades conforme feedback dos usuários.
- Criar funções independentes para limpar a lista e gerar o PDF.
- Modo Noturno.
- Melhoria na segurança com senhas mais robustas para login.
- Implementação de novas formas de login e autenticação (ex: autenticação via biometria, login social).
- Melhoria na Fonte (tipografia) do app


---

## 📋 Licença
Este projeto é pessoal e está protegido por "Todos os Direitos Reservados".  
Não está autorizado para uso, reprodução ou distribuição sem permissão expressa da autora.