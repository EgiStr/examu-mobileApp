import React, {useContext, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Button, Text} from 'react-native';
import TextInput from '../components/TextInput';
import emailValidator from '../helpers/emailValidator';
import passwordValidator, {ComparePassword} from '../helpers/passwordValidator';
import nameValidator from '../helpers/usernameValidation';
import axios from '../../services/axios/axios';
import Login from '../helpers/loginFunction';
import {GlobalContext} from '../../store/store';
import {globalColor} from '../styles/global';

const RegisterScreen = ({navigation}) => {
  // globalContext
  const {dispatch} = useContext(GlobalContext);
  const [username, setUsername] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [password2, setPassword2] = useState({value: '', error: ''});

  const onRegisterPressed = () => {
    const emailError = emailValidator(email.value);
    const usernameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);
    const password2Error = ComparePassword(password.value, password2.value);
    if (emailError || passwordError || usernameError || password2Error) {
      setEmail({...email, error: emailError});
      setUsername({...username, error: usernameError});
      setPassword2({...password2, error: password2Error});
      setPassword({...password, error: passwordError});
      return;
    }
    // create data for post request

    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    };
    // axios post request Register
    axios
      .post('register', data)
      .then(async res => {
        const isLogin = await Login(email.value, password.value);
        dispatch({type: 'LOGIN', payload: isLogin});
      })
      .catch(err => {
        console.log(err)
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({value: text, error: ''})}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
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
        returnKeyType="next"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Password Comfirm"
        returnKeyType="done"
        value={password2.value}
        onChangeText={text => setPassword2({value: text, error: ''})}
        error={!!password2.error}
        errorText={password2.error}
        secureTextEntry
      />
      <Button
        title={'Register'}
        color={globalColor.activeColor}
        onPress={onRegisterPressed}
      />

      <View style={styles.row}>
        <Text>have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
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
    color: '#fff',
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
