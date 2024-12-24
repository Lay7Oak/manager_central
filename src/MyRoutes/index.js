
import { createStackNavigator } from '@react-navigation/stack';
import { CustomBackButton } from './return';
import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import Register from '../pages/Register';
import MainPage from '../pages/MainPage/index';
import Customer from '../pages/Customer';
import Stock from '../pages/Stock/index';
import Orders from '../pages/Orders/index';
import Finance from '../pages/Finance/index';
import Services from '../pages/Services/index';
import UserPage from '../pages/UserPage/index';
import TermsAndPolicy from '../pages/TermsAndPolicy/index';
import HelpPage from '../pages/HelpPage/index';

const Stack  = createStackNavigator();

export default function MyRoutes() {
    return (
       <Stack.Navigator>
         <Stack.Screen 
           name= "Welcome"
           component={Welcome}
           options={ {headerShown:false} }  
         />

         <Stack.Screen 
           name= "SignIn"
           component={SignIn}
           options={ {headerShown:false} }  
         />

         <Stack.Screen 
           name= "ForgotPassword"
           component={ForgotPassword}
           options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Recuperação de Senha',
               headerTitleAlign: 'center',
           }} 
         />

         <Stack.Screen 
           name= "Register"
           component={Register}
            options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Cadastro',
               headerTitleAlign: 'center',
           }} 
         />

         <Stack.Screen 
           name= "MainPage"
           component={MainPage}
           options={ {headerShown:false} }  
         />

         <Stack.Screen 
           name= "Customer"
           component={Customer}
           options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Gerenciar Clientes',
               headerTitleAlign: 'center',
           }} 
         />

         <Stack.Screen 
           name= "Stock"
           component={Stock}
           options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Gerenciar Estoque',
               headerTitleAlign: 'center',
           }} 
         />

         <Stack.Screen 
           name= "Orders"
           component={Orders}
           options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Gerenciar Pedidos',
               headerTitleAlign: 'center',
           }} 
         />

         <Stack.Screen 
           name= "Finance"
           component={Finance}
           options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Gerenciar Finanças',
               headerTitleAlign: 'center',
           }} 
         />

         <Stack.Screen 
           name= "Services"
           component={Services}
           options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Gerenciar Serviços',
               headerTitleAlign: 'center',
           }} 
         />

         <Stack.Screen 
           name= "UserPage"
           component={UserPage}
           options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Minha Conta',
               headerTitleAlign: 'center',
           }} 
         />

          <Stack.Screen 
           name= "TermsAndPolicy"
           component={TermsAndPolicy}
           options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Termo de Uso e Política de Privacidade',
               headerTitleAlign: 'center',
           }} 
         />

          <Stack.Screen 
           name= "HelpPage"
           component={HelpPage}
           options={{
               headerLeft: () => <CustomBackButton />,  
               headerShown: true,
               headerTitle: 'Ajuda',
               headerTitleAlign: 'center',
           }} 
         />

       </Stack.Navigator>

       
    );
}

