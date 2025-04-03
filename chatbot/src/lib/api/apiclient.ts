import axios from 'axios';
import { ENV } from '../functions/config';

const apiClient = axios.create({
  baseURL: ENV.BACKEND_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});
export default apiClient