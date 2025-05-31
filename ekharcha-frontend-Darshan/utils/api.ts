import axios from 'axios';

console.log('🚀 API URL:', process.env.EXPO_PUBLIC_API_URL);

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Request interceptor add કરો debugging માટે
api.interceptors.request.use(request => {
  console.log('📤 Making request to:', request.url);
  console.log('📤 Full URL:', `${request.baseURL}${request.url}`);
  return request;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.log('❌ API Error:', error.message);
    console.log('❌ Request URL:', error.config?.url);
    console.log('❌ Base URL:', error.config?.baseURL);
    return Promise.reject(error);
  }
);

export default api;