import axios from 'axios';
import { ENV } from './config';
import Cookies from 'js-cookie'; // You'll need to install this package: npm install js-cookie

const apiClientNew = axios.create({
  baseURL: ENV.BACKEND_URL,
  withCredentials: true,
});

apiClientNew.interceptors.request.use((config) => {
  const accessToken = Cookies.get('access-token');
  const refreshToken = Cookies.get('refresh-token');
  console.log("@TOKEN1::",accessToken,"\n@TOKEN2::",refreshToken)
  if (accessToken || refreshToken) {
    const cookieHeader = [];
    if (accessToken) cookieHeader.push(`access-token=${accessToken}`);
    if (refreshToken) cookieHeader.push(`refresh-token=${refreshToken}`);
    
    config.headers['Cookie'] = cookieHeader.join('; ');
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClientNew.interceptors.response.use((response) => {
  const setCookieHeader = response.headers['set-cookie'] || [];
  
  const setCookies = Array.isArray(setCookieHeader) ? setCookieHeader : 
                    response.headers['set-cookie'] ? [response.headers['set-cookie']] : [];
  
  setCookies.forEach(cookieStr => {
    if (typeof cookieStr === 'string') {
      const [nameValue] = cookieStr.split(';');
      const [name, value] = nameValue.split('=');
      
      const maxAgeMatch = cookieStr.match(/Max-Age=(\d+)/i);
      const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) / (60*60*24) : undefined; // Convert to days for js-cookie
      
      const secure = cookieStr.toLowerCase().includes('secure');
      const path = cookieStr.match(/Path=([^;]+)/i)?.[1] || '/';
      
      console.log("@MAXAGE",maxAge)
      Cookies.set(name.trim(), value.trim(), {
        expires: maxAge ? maxAge : undefined,
        // domain:".realtixx.in",
        secure: secure,
        path: path,
        sameSite: 'lax'
      });
    }
  });
  
  return response;
}, async (error) => {
  // Handle errors (including refresh token logic if needed)
  if (error.response?.status === 401) {
    // Implement refresh token logic here if needed
  }
  
  return Promise.reject(error);
});

export default apiClientNew;