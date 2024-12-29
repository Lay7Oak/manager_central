import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';


const styles = StyleSheet.create({
  ...globalStyles,

  container: {
    flex: 1,
    backgroundColor:'#990a17',
     },
  containerHeader: {
    marginTop: '20%',
    marginBottom: '1%',
    paddingStart: '3%',
  },
  containerHeader2: {
    paddingStart: '3%',
    marginBottom: '9%',
  },
  message: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fafafa',
    marginLeft:'15',
  },
  containerForm: {
    flex: 1,
    backgroundColor:'#fafafa',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderTopLeftRadius: 35,
    // borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop:20,
  
  },

  title: {
    fontSize: 20,
    marginTop: 40,
  },

  input: {
    borderBottomWidth: 0.7,
    borderBottomColor: '#919199',
    borderRadius: 15,
    height: 50,
    marginTop: 40,
    fontSize: 19,
    paddingLeft: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    color: '#990a17',
    shadowColor: '#fafafa',         
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25,          
    shadowRadius: 5,           
    elevation: 70,
  
  },
  
  button: {
    backgroundColor: '#990a17',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 9,
    marginTop: 65,
    marginBottom: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: 'bold',
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
  esqueceText: {
    color: '#919191',
    fontSize: 15,
    marginTop: 5,
    marginStart: '9%',
    alignSelf: 'flex-start',
    position: 'static',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:2,
  },

  ajuda: {
    marginTop: 40,
  
  },

  ajudaText: {
    color: '#919191',
    fontSize: 20,
    textAlign:'center',
  },

  lock: { 
    marginRight: 15, 
    marginTop: 50, 
  },


});

export default styles;
