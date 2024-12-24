import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container2: {
    flex: 1,
    backgroundColor: '#990a17',
    margin: '1%',
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 25,
    paddingTop: '10%',
  },
  message: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '5%',
    textAlign: 'center',
    color: '#990a17',
  },
  information: {
    marginBottom: 40,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#990a17',
  },
  input: {
    borderBottomWidth: 0.7,
    borderBottomColor: '#919199',
    borderRadius: 15,
    height: 50,
    marginBottom: 40,
    fontSize: 19,
    paddingLeft: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    color: '#fafafa',
    shadowColor: '#fafafa',         
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25,          
    shadowRadius: 5,           
    elevation: 70,
  
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginLeft:20,

  },
 
  label: {
    color: '#D9D9D9',
    marginRight: 50,
    fontSize:15,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#D9D9D9',
    
  },
  
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 9,
    marginTop: 20,
    marginBottom: 41,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#990a17',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonRegister: {
     marginRight: '15%',
    alignSelf: 'center',
  },
  registerText: {
    color: '#D9D9D9',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
  },

   
});

export default styles;
