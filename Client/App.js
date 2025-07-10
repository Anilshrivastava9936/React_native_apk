
// import { AuthProvider } from './context/authContext';
// import Login from './Screens/auth/Login';
// import Register from './Screens/auth/Register';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './Screens/Home';
import RootNavigation from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  // const Stack = createNativeStackNavigator();
  return (


    <GestureHandlerRootView style={{ flex: 1 }}>

      <NavigationContainer>
        {/* <AuthProvider>
        
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        
        </Stack.Navigator>
        </AuthProvider> */}
        <RootNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


