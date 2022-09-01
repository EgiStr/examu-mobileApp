import React, {useState, useContext} from 'react';
import {TouchableOpacity, StyleSheet, View, Button, Text} from 'react-native';
import {GlobalContext} from '../../store/store';
import axios from 'axios';
import TextInput from '../components/TextInput';
import emailValidator from '../helpers/emailValidator';
import Login from '../helpers/loginFunction';
import passwordValidator from '../helpers/passwordValidator';
import {globalColor} from '../styles/global';

const LoginScreen = ({navigation}) => {
  const {dispatch} = useContext(GlobalContext);
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    try {
      const isLogin = await Login(email.value, password.value);
      if (isLogin) {
        dispatch({type: 'LOGIN'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="send"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button
        style={{marginTop: 20}}
        color={globalColor.activeColor}
        title={'LOGIN'}
        onPress={onLoginPressed}
      />

      <View style={styles.row}>
        <Text style={{color: 'grey'}}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: globalColor.background,
  },

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  forgot: {
    fontSize: 13,
    color: 'red',
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
});
export default LoginScreen;
