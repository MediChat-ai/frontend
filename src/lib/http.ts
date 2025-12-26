import axios from 'axios';
import { env } from '../config/env';

export const api = axios.create({
  baseURL: env.backend,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

export const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
