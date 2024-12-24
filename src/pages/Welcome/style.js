import { StyleSheet } from 'react-native';
import globalStyles from '../../Styles/globalStyles';


const styles = StyleSheet.create({
  ...globalStyles,
  gradientBackground: {
    flex: 1,
  },
  containerLogo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-ExtraBoldItalic',
  },
  text: {
    color: '#919191',
    marginTop: 13,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    ...globalStyles.button,
    backgroundColor: '#990a17',
    position: 'absolute',
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    borderRadius: 50,
  },
  buttonText: {
    ...globalStyles.buttonText,
    fontSize: 18,
  },
});

export default styles;
