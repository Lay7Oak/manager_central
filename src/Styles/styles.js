// styles.js
import { StyleSheet } from 'react-native';

const colors = {
  primary: ['#8b0045', '#250012'],
  secondary: '#ffffff',
  textGray: '#919191',
  buttonPrimary: '#4A90E2', // cor para os botões principais
  buttonSecondary: '#E94E77', // cor para os botões secundários
  buttonTertiary: '#50E3C2', // cor para os botões terciários
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'linear-gradient(to bottom, #8b0045, #250012)', // Degradê
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: colors.textGray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: colors.textGray,
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: 30,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 16,
  },
  squareButton: {
    backgroundColor: colors.buttonSecondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  squareButtonText: {
    color: colors.secondary,
    fontSize: 16,
  },
  linkText: {
    color: colors.secondary,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default styles;
export { colors };
