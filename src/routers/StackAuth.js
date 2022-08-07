import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/registerScreen';
import WelcomeScreen from '../screens/WelcomeScreen.js';
import { globalColor } from '../styles/global';
export default function StackAuth(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: globalColor.background,
          borderColor: globalColor.background,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
        },
        // centerTitle: true,
        headerTintColor: globalColor.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
      }}
      {...props}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
