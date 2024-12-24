import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';


const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },

  statusBar: {
    backgroundColor: "#990a17",  
  },

  barraUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'space-between',
    
  },

  userName: { 
    fontSize: 23,
    color: '#696969',
    marginLeft: '7%',
  },

  iconUser: {
    width: 50,
    height: 50,
    marginRight: '5%',
    borderRadius: 50 / 2, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#919191', 
    padding: 10,
  },

  containerHeader: {
    marginTop: '7%',
    marginBottom: '1%',
    paddingStart: '3%',
    
  },

  containerHeader2: {
    paddingStart: '3%',
    marginBottom: '9%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:'PlayfairDisplay_400Regular_Italic',
    
    
  },

  message: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#990a17",
    fontFamily:'PlayfairDisplay-Italic-VariableFont_wght',
    elevation: 7,
    
  },

  containerForm: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    paddingTop: '10%',
    paddingStart: '5%',
    paddingEnd: '5%',
    alignItems: 'center',
    justifyContent: 'center',
       
  },

  servicos: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 17,
    borderRadius: 17,
    elevation: 7,
    flexDirection: 'row',
   
  },

  servicosText: {
    fontSize: 27,
    color: '#696969',
    marginLeft: 15, 
  },

  ajuda: {
    marginTop: 60,
    
  },

  ajudaText: {
    color: '#919191',
    fontSize: 20,
    textAlign:'center',
  },

  buttonRegister: {
    margin: 40,
    marginTop:15,
    alignSelf: 'center',
  },

  registerText: {
    color: '#919191',
    fontSize: 15,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalDescription: {
    fontSize: 19,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalLink: {
    fontSize: 16,
    color: '#007BFF', 
    textDecorationLine: 'underline',
    marginVertical: 10,
    textAlign: 'center',
  },
  modalNote: {
    fontSize: 14,
    color: '#999',
    marginVertical: 10,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
