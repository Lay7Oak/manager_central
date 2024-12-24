import React from 'react';
import { View, Text, ScrollView, } from 'react-native';
import styles from './style';

const TermsAndPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Termo de Uso (Versão Teste)</Text>
        <Text style={styles.text}>
          1. Propósito do Aplicativo: Este aplicativo está em fase de teste e coletará informações sobre a experiência do usuário através de formulários para melhorar a versão final do aplicativo.
        </Text>
        <Text style={styles.text}>
          2. Aceitação dos Termos: Ao usar este aplicativo, você concorda com estes Termos de Uso. Se não concordar, por favor, não use o aplicativo.
        </Text>
        <Text style={styles.text}>
        3. Armazenamento Local de Dados: Os dados do usuário são armazenados localmente no dispositivo de forma criptografada. 
        Para garantir a segurança das informações, não é recomendado cadastrar mais de um usuário no mesmo dispositivo. 
        Na troca de dispositivo, os dados não serão transferidos automaticamente. 
        Caso necessário, utilize a opção 'Limpar Lista' para salvar ou compartilhar o PDF dos dados. (Consulte a seção 'Limpar Lista' na Aba Ajuda.)

        </Text>
        <Text style={styles.text}>
          4. Fase de Teste: Os termos de uso permanecerão inalterados durante o período de teste do aplicativo, exceto se necessário para resolver questões imprevistas.
        </Text>
        <Text style={styles.text}>
          5. Hiato do Serviço: O aplicativo entrará em hiato após o teste. Todos os dados serão deletados, e o serviço será suspenso para melhorias e retorno em uma versão futura.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Política de Privacidade (Versão Teste)</Text>
        <Text style={styles.text}>
          1. Coleta de Dados: Coletamos feedback e dados de experiência dos usuários exclusivamente por meio de formulários.
        </Text>
        <Text style={styles.text}>
          2. Uso dos Dados: As informações coletadas serão usadas exclusivamente para melhorar a versão final do aplicativo.
        </Text>
        <Text style={styles.text}>
        3. Armazenamento Local de Dados: Os dados do usuário são armazenados localmente no dispositivo de forma criptografada. 
        Para garantir a segurança das informações, não é recomendado cadastrar mais de um usuário no mesmo dispositivo. 
        Na troca de dispositivo, os dados não serão transferidos automaticamente. 
        Caso necessário, utilize a opção 'Limpar Lista' para salvar ou compartilhar o PDF dos dados. (Consulte a seção 'Limpar Lista' na Aba Ajuda.)

        </Text>
        <Text style={styles.text}>
          4. Compartilhamento de Dados: Não compartilhamos suas informações com terceiros.
        </Text>
        <Text style={styles.text}>
          5. Segurança: Implementamos medidas de segurança para proteger suas informações durante o período de teste.
        </Text>
      </View>
    </ScrollView>
  );
};

export default TermsAndPolicy;
