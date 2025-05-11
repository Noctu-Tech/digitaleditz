import axios from 'axios';
import { ENV } from './config';
import Cookies from 'js-cookie'; // You'll need to install this package: npm install js-cookie

const apiClientNew = axios.create({
  baseURL: ENV.BACKEND_URL,
  withCredentials: true,
});

export default apiClientNew;