// src/api/api.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ✅ Use environment variable from .env
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://192.168.170.220:8000",
});

// 🛡️ Add token to headers
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 🐞 Debug logs
  console.log("📤 Request to:", config.url);
  console.log("🔗 Full URL:", `${config.baseURL}${config.url}`);
  return config;
});

// 🐞 Response error log
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("❌ API Error:", error.message);  
    console.log("❌ URL:", error.config?.url);
    console.log("❌ Base URL:", error.config?.baseURL);
    return Promise.reject(error);
  }
);

export default api;
