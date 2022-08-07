import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../screens/profile';

import {globalColor} from '../styles/global';

export default function StackProfile(props) {
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
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="History" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
