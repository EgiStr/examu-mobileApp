import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import Ulangan from '../screens/ulangan';
import PreUlangan from '../screens/preUlangan';
import {globalColor} from '../styles/global';
import SummaryQuiz from '../screens/SummaryQuiz';
import MultiplayedUlangan from '../screens/MultiplayedUlangan';

export default function StackHome() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      // setBackgroundColor globalColor.backgournd
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
      }}>
      <Stack.Screen
        name="HomeStack"
        component={Home}
        options={{ headerShown: false}}
      />
      <Stack.Screen name="PreUlangan" component={PreUlangan} />
      <Stack.Screen
        name="Ulangan"
        component={Ulangan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Multiplayers"
        component={MultiplayedUlangan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SummaryQuiz"
        component={SummaryQuiz}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
