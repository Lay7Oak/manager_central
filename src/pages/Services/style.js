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
    backgroundColor: '#de3f40',
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
  inputWithIcon: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    paddingHorizontal: 30,
    textAlign:'center',
  },

  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  iconButton: { marginLeft: 10 },
  button: {
    backgroundColor: '#de3f40',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    elevation: 7,
    
  },
  buttonText: { color: '#fff',
    fontWeight: 'bold',
    fontSize:18, },
    
  sectionTitle: { fontSize: 21, fontWeight: 'bold', marginTop: 20, textAlign:'center', },

  buttonOrg: {
    marginTop:20,
    width:'47%',
    backgroundColor: '#e56667',
    paddingVertical: 10,
    paddingHorizontal: 9,
    borderRadius: 5,
    alignItems: 'center',
    margin: '1%',
    textAlign:'center',
    elevation: 7,
  },

  divider: { borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 10, flexGrow: 1, 
    paddingBottom: 20, },

  servico: {
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
  servicoText: {
    fontSize: 19,
    marginBottom: 5,
  },

  pedidoTextStatus:{
   fontSize:22,
   marginBottom: 30,
   marginTop:9,
  
  },

    headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',  
    width: '100%',
    marginBottom: 10,      
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
  concluidoButton: { backgroundColor: '#3dabad',  elevation: 2,},
  canceladoButton: { backgroundColor: '#919191',  elevation: 2, },
  editButton: { backgroundColor: '#e56667',  elevation: 2, },

  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  
});

export default styles;
