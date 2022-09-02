import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackHome from './stackHome';
import StackCreate from './stackCreate';
import StackProfile from './stackProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalColor} from '../styles/global';

const TabStack = createBottomTabNavigator();
const TabsScreen = () => {
  return (
    <TabStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Create') {
            iconName = 'add';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }
          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={20}
              color={focused ? globalColor.activeColor : 'white'}
            />
          );
        },
        headerShown: false,
        // set ActiceColor gradient from globalColor.buttonA and buttonB
        tabBarActiveTintColor: globalColor.activeColor,
        tabBarActiveBackgroundColor: globalColor.container,
        tabBarInactiveBackgroundColor: globalColor.container,
        tabBarStyle: {
          backgroundColor: globalColor.container,
          borderTopColor: 'transparent',
          borderTopWidth: 0,
        },
      })}>
      <TabStack.Screen name={'Home'} component={StackHome} />
      <TabStack.Screen name={'Create'} component={StackCreate} />
      <TabStack.Screen name={'Profile'} component={StackProfile} />
    </TabStack.Navigator>
  );
};

export default TabsScreen;
