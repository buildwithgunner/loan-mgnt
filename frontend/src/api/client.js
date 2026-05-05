const BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Simple authenticated API client.
 * Automatically adds the Bearer token from localStorage.
 */
export async function apiClient(endpoint, { method = 'GET', body = null } = {}) {
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  
  const headers = {
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
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
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    return Promise.reject(error.message || 'Network error');
  }
}
