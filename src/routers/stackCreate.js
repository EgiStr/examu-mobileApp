import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {globalColor} from '../styles/global';
import create from '../screens/create';
import EditQuizz from '../screens/EditQuizz';
import QuestionCreation from '../screens/QuestionCreation';
import QuestionEdit from '../screens/QuestionEdit';

const stackCreate = () => {
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
      }}>
      <Stack.Screen
        name="ListDraft"
        component={create}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditQuizz"
        component={EditQuizz}
        options={{title: 'Edit Quizz'}}
      />

      <Stack.Screen
        name="CreationQuestion"
        component={QuestionCreation}
        options={{title: 'Creation Question'}}
      />
      <Stack.Screen
        name="EditQuestion"
        component={QuestionEdit}
        options={{title: 'Edit Question'}}
      />


    </Stack.Navigator>
  );
};

export default stackCreate;
