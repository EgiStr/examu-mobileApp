import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { globalColor } from '../styles/global';

const WelcomeScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:globalColor.background
      }}>
     
      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          paddingHorizontal: 40,
          borderRadius: 20,
          paddingVertical: 8,
          margin: 6,
          borderWidth: 1,
          borderColor:'#fff'
        }}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}>
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          paddingHorizontal: 40,
          borderRadius: 20,
          paddingVertical: 8,
          margin: 6,
          borderWidth: 1,
          borderColor:'#fff'
        }}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
