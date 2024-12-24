import * as SecureStore from 'expo-secure-store';

const SecureStorage = {
  async setItem(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('Erro ao salvar dados de forma segura:', e);
      throw new Error('Falha ao salvar os dados de forma segura');
    }
  },

  async getItem(key) {
    try {
      let result = await SecureStore.getItemAsync(key);
      return result ? JSON.parse(result) : null;
    } catch (e) {
      console.error('Erro ao buscar dados de forma segura:', e);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error('Erro ao remover dados de forma segura:', e);
    }
  }
};

export default SecureStorage;
