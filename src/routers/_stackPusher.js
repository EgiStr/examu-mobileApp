import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/_loginScreen';
import QuizScreen from '../screens/_quisScreen';

const Stack = createStackNavigator()

export default function RootStack(){
    return <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="quizz" component={QuizScreen} />
    </Stack.Navigator>
};
