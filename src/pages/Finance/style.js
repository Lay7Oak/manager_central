import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';


const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#33808a',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
    elevation: 7,
  },
  dashboard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 7,
  },
  dashboardItem: {
    fontSize: 21,
    marginBottom: 5,
    fontWeight:'bold',
    marginBottom: 13,
    
  },
  receita: {
    color: 'green',
    fontSize: 21,
    marginRight: 10,
    fontWeight:'400',
    
  },
  despesa: {
    color: 'red',
    fontSize: 21,
    marginRight: 10,
    fontWeight:'400',
  
  },
  section: {
    marginBottom: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    width: '65%',
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#33808a',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    elevation: 7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconButton: {
    marginRight: 35,
  },
  detailsButton: {
    backgroundColor: '#919191',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    elevation: 7,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonOrg: {
    backgroundColor: '#91919191',
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 5,
    alignItems: 'center',
    width: '47%',
    
  },
  transacoesContainer: {
    marginBottom: 15,
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 7,
  },
  transacaoItem: {
    backgroundColor: '#fff',
    padding: 7,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    elevation: 7,
  },
  transacaoText: {
    fontSize: 19,
    color: '#333',
    justifyContent: 'space-between',
    lineHeight: 30,
  },
  descricao: {
    fontSize: 19,
    marginRight: 10,
  },
  data: {
    fontSize: 14,
    color: '#777',
  },

  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default styles;
