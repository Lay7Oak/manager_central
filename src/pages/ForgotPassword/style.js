import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';


const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    flex: 1,
    paddingTop: '5%',
    paddingStart: '1%',
    paddingEnd: '1%',
    backgroundColor: '#990a17',
  },

  containerForm: {
    flex: 1,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: '15%',
    paddingStart: '5%',
    paddingEnd: '5%',
    
  },

  title: {
    marginTop: '10%',
    marginBottom: 50,
    fontSize: 23,
   
    color: '#ffff',
    textAlign: 'center',
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#990a17',
    height: 40,
    marginBottom: 12,
    fontSize: 18,
    color: '#990a17',
    textAlign: 'center',
  },

  information: {
    marginTop: 40,
    marginBottom: 50,
    fontSize: 20,
    color: '#808080',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#990a17',
    paddingVertical: 9,
    marginTop: 41,
    marginBottom: 41,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '60%',
    alignSelf: 'center',
  },

  buttonText: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  ajuda:{
   marginTop: 40,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign:'center',
  
 },

 ajudaText:{
   color:'#919191',
   fontSize: 20,
   justifyContent: 'center',
  alignItems: 'center',
  textAlign:'center',
  
 },

  buttonRegister: {
    margin: 25,
    alignSelf: 'center',
  },
    registerText: {
    color: '#919191',
    fontSize: 15,
  },
});

export default styles;
