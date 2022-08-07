import React, {useContext} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './src/routers/RootRoute';
import {GlobalProvider} from './store/store';
import Toast from './src/components/Toast';
const App = () => {
  return (
    <GlobalProvider>
      <Toast />
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
