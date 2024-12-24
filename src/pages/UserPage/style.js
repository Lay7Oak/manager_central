import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';


const styles = StyleSheet.create({
  ...globalStyles,
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#990a17',
    marginBottom: 20,
    marginTop: 20,
    
  },
  sectionContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#919191',
    margin: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
  },
  label: {
    color: '#919191',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
    padding: 20,
  },

  button: {
    backgroundColor: '#990a17', 
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },

  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },

  link: {
    textDecorationLine: 'underline',
    color: '#919191',
    fontSize: 15,
  },
  cancelAccount: {
    color: '#990a17',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },

  buttonRegister: {
    margin: 40,
    alignSelf: 'center',
  },

  registerText: {
    color: '#919191',
    fontSize: 15,
  },

  modalLink: {
    fontSize: 18,
    color: '#007BFF',
    textDecorationLine: 'none',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default styles;
