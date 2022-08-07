
import {setCredentials} from './setCredentials';
import {axiosAuth} from '../../services/axios/axios';

export default async function Login(email, password) {
  if (!email || !password) {
    return false;
  }
  try {
    // call api post login
    const response = await axiosAuth.post('/login', {
      email,
      password,
    });
    // set credentials
    await setCredentials(response.data);
    return true;

  } catch (error) {
    console.log(error);
    return false;
  }
}
