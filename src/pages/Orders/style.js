import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
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
    backgroundColor: '#7A1745',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
    elevation: 7,
  },
  
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
 
  inputWithIcon: {  borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5, marginRight:10, height: 45},
  datePickerContainer: { flexDirection: 'row', alignItems: 'center' },

  iconButton: {
    padding: 5,
    
  },

  dropdown: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#7A1745',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    elevation: 7,
  },
  buttonText: { color: '#fff',
    fontWeight: 'bold',
    fontSize:18, },
 
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
  },

buttonOrg: {
    marginTop:20,
    width:'47%',
    backgroundColor: '#A93A6A',
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 5,
    alignItems: 'center',
    margin: '1%',
    textAlign:'center',
    elevation: 7,
  },


  pedido: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },

 
  pedidoText:{
    fontSize: 19,
    marginBottom: 5,
  },


  pedidoTextStatus:{
   fontSize:20,
   marginBottom: 30,
   marginTop:9,
  
  },

  containerButtonSmall:{
   flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    // marginHorizontal: 12,
  },

 
  buttonSmall: {
   paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    marginTop: 15,
  },
  pagoButton: {
    backgroundColor: '#3dabad',
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#919191',
    elevation: 2,
  },
  editButton: {
    backgroundColor: '#A93A6A',
    elevation: 2,
  },
  
});

export default styles;
