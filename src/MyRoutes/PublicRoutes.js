// import { createStackNavigator } from '@react-navigation/stack';
// import Welcome from '../pages/Welcome';
// import SignIn from '../pages/SignIn';
// import Register from '../pages/Register';
// import ForgotPassword from '../pages/ForgotPassword';
// import MainPage from '../pages/MainPage';
// import TermsAndPolicy from '../pages/TermsAndPolicy';
// import HelpPage from '../pages/HelpPage';

// const Stack = createStackNavigator();

// export default function PublicRoutes() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen 
//         name="Welcome" 
//         component={Welcome} 
//         options={{ headerShown: false }} 
//       />

//         <Stack.Screen 
//            name= "SignIn"
//            component={SignIn}
//            options={ {headerShown:false} }  
//          />

//      <Stack.Screen 
//         name= "ForgotPassword"
//           component={ForgotPassword}
//           options={{
//               headerLeft: () => <CustomBackButton />,  
//               headerShown: true,
//               headerTitle: 'Recuperação de Senha',
//               headerTitleAlign: 'center',
//           }} 
//         />

//         <Stack.Screen 
//           name= "Register"
//           component={Register}
//           options={{
//               headerLeft: () => <CustomBackButton />,  
//               headerShown: true,
//               headerTitle: 'Cadastro',
//               headerTitleAlign: 'center',
//           }} 
//         />

//         <Stack.Screen 
//           name= "MainPage"
//           component={MainPage}
//           options={ {headerShown:false} }  
//         />


//         <Stack.Screen 
//            name= "TermsAndPolicy"
//            component={TermsAndPolicy}
//            options={{
//                headerLeft: () => <CustomBackButton />,  
//                headerShown: true,
//                headerTitle: 'Termo de Uso e Política de Privacidade',
//                headerTitleAlign: 'center',
//            }} 
//          />

//           <Stack.Screen 
//            name= "HelpPage"
//            component={HelpPage}
//            options={{
//                headerLeft: () => <CustomBackButton />,  
//                headerShown: true,
//                headerTitle: 'Ajuda',
//                headerTitleAlign: 'center',
//            }} 
//          />

//     </Stack.Navigator>
//   );

// }
