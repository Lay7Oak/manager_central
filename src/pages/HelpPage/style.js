import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';

const styles = StyleSheet.create({
    ...globalStyles,
      container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    subheading: {
      fontSize: 18,
      color: '#555',
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 19,
      fontWeight: '600',
      marginTop: 10,
    },
    text: {
      fontSize: 17,
      marginVertical: 5,
      lineHeight: 24,
      color: '#666',
      
    },
    button: {
      marginTop: 20,
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  export default styles;