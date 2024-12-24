import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('Erro ao salvar dados:', e);
      throw new Error('Falha ao salvar os dados');
    }
  },

  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Erro ao buscar dados:', e);
      return null;     }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Erro ao remover dados:', e);
    }
  },

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Erro ao limpar dados:', e);
    }
  },
};

export default Storage;
