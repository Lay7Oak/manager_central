import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';

const styles = StyleSheet.create({
    ...globalStyles,
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#333',
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
      color: '#666',
      marginVertical: 5,
    },
    section: {
      paddingHorizontal: 15,
      marginBottom: 20,
    },
  });

  export default styles;