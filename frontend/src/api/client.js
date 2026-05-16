import { notify } from '../utils/notifications';

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

/**
 * Simple authenticated API client.
 * Automatically adds the Bearer token from localStorage.
 */
export async function apiClient(endpoint, { method = 'GET', body = null } = {}) {
  const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token');
  
  const headers = {
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If body is NOT FormData, set Content-Type to application/json
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    method,
    headers,
    body: body instanceof FormData ? body : (body ? JSON.stringify(body) : null),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    if (response.status === 401) {
      // Handle unauthorized (expired token)
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');
      window.location.href = '/login';
      return null;
    }

    const data = await response.json();
    
    if (!response.ok) {
      const errorMsg = (data && data.message) || response.statusText || 'System Synchronization Failure';
      notify.error('PROTOCOL REJECTED', errorMsg);
      return Promise.reject(errorMsg);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    const friendlyMsg = 'Infrastructure link failure. Please check your network connection.';
    notify.error('NETWORK TIMEOUT', friendlyMsg);
    return Promise.reject(friendlyMsg);
  }
}
