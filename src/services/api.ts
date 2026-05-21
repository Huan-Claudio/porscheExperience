import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    if (error.response?.status === 404) {
      console.warn('Recurso não encontrado');
    } else if (error.response?.status === 500) {
      console.error('Erro interno do servidor');
    }
    return Promise.reject(error);
  }
);

export default api;
