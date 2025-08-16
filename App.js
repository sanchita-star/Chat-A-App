
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import UserListScreen from "./screens/UserListScreen";
import ChatScreen from "./screens/ChatScreen"; 

const Stack = createStackNavigator();

export default function App() {
   return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen 
          name="SignupScreen" 
          component={SignupScreen} 
          options={{ title: "Sign Up" }} 
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ title: "Login" }} 
        />
        <Stack.Screen name="UserListScreen"
         component={UserListScreen}  
         />

        <Stack.Screen 
          name="ChatScreen" 
          component={ChatScreen} 
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
