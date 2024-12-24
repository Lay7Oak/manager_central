import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    width: '85%',
    paddingLeft: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#CB4F57',
    borderRadius: 5,
    elevation: 7,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#CB4F57',
    padding: 12,
    borderRadius: 5,
    width: '48%',
    elevation: 7,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize:18,
  },

  mudarCor:{
    backgroundColor:'#d57178',
  },
  
  cliente: {
    backgroundColor: '#fafafa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
     elevation: 7,
  },
  clienteText: {
    fontSize: 16,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  editButton: {
    backgroundColor: '#d57178',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 15,
    elevation: 2,
  },

  deleteButton: {
    backgroundColor: '#990a17',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 15,
    elevation: 2,
  },
  
 
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});


export default styles;
