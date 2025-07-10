import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../../Screens/Home";
import Register from "../../../Screens/auth/Register";
import Login from "../../../Screens/auth/Login";
import { AuthContext } from "../../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import Post from "../../../Screens/Post";
import About from "../../../Screens/About";
import Account from "../../../Screens/Account";
import Myposts from "../../../Screens/Myposts";

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
 
  return (

    <Stack.Navigator initialRouteName={authenticatedUser?'Home':'Login'}>
     
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "full stack app",
            headerRight: () => <HeaderMenu />,
          }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
          headerBackTitle:'Back',
            headerRight: () => <HeaderMenu />,
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
          headerBackTitle:'Back',
            headerRight: () => <HeaderMenu />,
          }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
          headerBackTitle:'Back',
            headerRight: () => <HeaderMenu />,
          }}
        />
        <Stack.Screen
          name="Myposts"
          component={Myposts}
          options={{
          headerBackTitle:'Back',
            headerRight: () => <HeaderMenu />,
          }}
        />
     

          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
         </Stack.Navigator>
    // <Stack.Navigator initialRouteName="Login">
    //   {authenticatedUser ? (
    //     <Stack.Screen
    //       name="Home"
    //       component={Home}
    //       options={{
    //         title: "full stack app",
    //         headerRight: () => <HeaderMenu />,
    //       }}
    //     />
    //   ) : (
    //     <>

    //       <Stack.Screen
    //         name="Register"
    //         component={Register}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen
    //         name="Login"
    //         component={Login}
    //         options={{ headerShown: false }}
    //       />
    //     </>
    //   )}

    //   {/* <Stack.Screen name="Home" component={Home} 
    //   options={{ title:"full stack app",
    //           headerRight:()=><HeaderMenu/>

    //   }} />
    //   <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    //         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
    // </Stack.Navigator>
  );
};

export default ScreenMenu;










      