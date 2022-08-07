import React, {useState, useEffect, useContext} from 'react';
import getCredentials from '../helpers/setCredentials';
import StackAuth from './StackAuth';
import TabsScreen from './tabNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import {GlobalContext} from '../../store/store';
export default function RootStack(props) {
  const {state, dispatch} = useContext(GlobalContext);

  const checkToken = async () => {
    try {
      const token = await getCredentials();
      if (token) {
        dispatch({type: 'LOGIN'});
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator {...props} screenOptions={{headerShown: false}}>
      {state.login ? (
        <Stack.Screen name="feed" component={TabsScreen} />
      ) : (
        <Stack.Screen name="auth" component={StackAuth} />
      )}
    </Stack.Navigator>
  );
}
