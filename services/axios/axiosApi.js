import axios from 'axios';
import getCredentials from '../../src/helpers/setCredentials';
import {baseURL} from '../../temp/config';

const axiosApiInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const value = await getCredentials();
    if (!value) {
      throw new Error('not login');
    }

    config.headers = {
      Authorization: `Bearer ${value.access}`,
    };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await getCredentials();
      if (!access_token) {
        return Promise.reject(error);
      }

      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + access_token.access;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);
export default axiosApiInstance;
