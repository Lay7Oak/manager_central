import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';


const styles = StyleSheet.create({
  ...globalStyles,

  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#fff',
  },

  container3:{
    flex: 1,
    padding: 2,
    
  },

 
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize:16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputSmall: {
    width: '48%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
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

  iconContainer: {
    paddingLeft: 10,
    marginRight:22,
    
  
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
    backgroundColor: '#3d0446',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
    elevation: 7,
  },
 button: {
    backgroundColor: '#3d0446',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    elevation: 7,
  },
  buttonText: { color: '#fff',
    fontWeight: 'bold',
    fontSize:18, },

   totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },

  textarea: {
    height: 80,
    textAlignVertical: 'top',
  },

  sectionTitle: { fontSize: 21, fontWeight: 'bold', marginTop: 35, textAlign:'center', },

buttonOrg: {
    marginTop:20,
    width:'47%',
    backgroundColor: '#7A3D8A',
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 5,
    alignItems: 'center',
    margin: '1%',
    textAlign:'center',
    elevation: 7,
  },

  productItem: {
    backgroundColor: '#fff',
    padding: 25,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
  },
  productText: {
    fontSize: 19,
    color: '#333',
    marginBottom: 5,
    
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center', 
  },
  editButton: {
    backgroundColor: '#7A3D8A',
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
});


export default styles;
