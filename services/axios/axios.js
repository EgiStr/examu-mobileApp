import axios from 'axios';
import {baseURL} from '../../temp/config';

export const axiosAuth = axios.create({
  baseURL,
headers: {
  'Content-Type': 'application/json',
},
});

export default axiosAuth;
