import axios from 'axios';

const detectedHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';
const defaultBase = `${protocol}//${detectedHost}:8000`;

const BASE_URL = import.meta.env.VITE_API_URL || defaultBase;

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export async function ensureCsrfCookie() {
  await api.get(`${BASE_URL}/sanctum/csrf-cookie`);
}

export default api;
