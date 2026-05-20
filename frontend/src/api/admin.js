import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return { Authorization: `Bearer ${token}` };
};

export const getAdminStats = async () => {
  const response = await axios.get(`${API_URL}/admin/stats`, { headers: getAuthHeader() });
  return response.data;
};

export const getAdminNotifications = async () => {
  const response = await axios.get(`${API_URL}/admin/notifications`, { headers: getAuthHeader() });
  return response.data;
};

export const getAdminApplications = async () => {
  const response = await axios.get(`${API_URL}/admin/applications`, { headers: getAuthHeader() });
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await axios.post(`${API_URL}/admin/applications/${id}/status`, { status }, { headers: getAuthHeader() });
  return response.data;
};

export const updateApplicationProgress = async (id, data) => {
  const response = await axios.post(`${API_URL}/admin/applications/${id}/progress`, { 
    processing_stage: data.processing_stage, 
    processing_level: data.processing_level 
  }, { headers: getAuthHeader() });
  return response.data;
};

export const generateApprovalCodeDirectly = async (id) => {
  const response = await axios.post(`${API_URL}/admin/applications/${id}/generate-code`, {}, { headers: getAuthHeader() });
  return response.data;
};

export const generateTrackingCodeDirectly = async (id) => {
  const response = await axios.post(`${API_URL}/admin/applications/${id}/tracking-code`, {}, { headers: getAuthHeader() });
  return response.data;
};

export const generateBothCodesDirectly = async (id) => {
  const response = await axios.post(`${API_URL}/admin/applications/${id}/generate-both-codes`, {}, { headers: getAuthHeader() });
  return response.data;
};

export const updateApplicationDetails = async (id, data) => {
  const response = await axios.put(`${API_URL}/admin/applications/${id}`, data, { headers: getAuthHeader() });
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await axios.get(`${API_URL}/admin/users`, { headers: getAuthHeader() });
  return response.data;
};

export const updateAdminUser = async (id, data) => {
  const response = await axios.put(`${API_URL}/admin/users/${id}`, data, { headers: getAuthHeader() });
  return response.data;
};

export const deleteAdminUser = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/users/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const getAdminLeads = async () => {
  const response = await axios.get(`${API_URL}/admin/leads`, { headers: getAuthHeader() });
  return response.data;
};

export const createAdminLead = async (data) => {
  const response = await axios.post(`${API_URL}/admin/leads`, data, { headers: getAuthHeader() });
  return response.data;
};

export const updateLeadStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/admin/leads/${id}/status`, { status }, { headers: getAuthHeader() });
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/leads/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const getAdminUserProfile = async (id) => {
  const response = await axios.get(`${API_URL}/admin/users/${id}/profile`, { headers: getAuthHeader() });
  return response.data;
};

export const getAdminSettings = async () => {
  const response = await axios.get(`${API_URL}/admin/settings`, { headers: getAuthHeader() });
  return response.data;
};

export const updateAdminSettings = async (settings) => {
  const response = await axios.put(`${API_URL}/admin/settings`, { settings }, { headers: getAuthHeader() });
  return response.data;
};

export const adminLogin = async (credentials) => {
  const response = await axios.post(`${API_URL}/admin/login`, credentials);
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const adminRegister = async (data) => {
  const response = await axios.post(`${API_URL}/admin/register`, data);
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const activateUser = async (id) => {
  const response = await axios.post(`${API_URL}/admin/users/${id}/activate`, {}, { headers: getAuthHeader() });
  return response.data;
};

export const deactivateUser = async (id) => {
  const response = await axios.post(`${API_URL}/admin/users/${id}/deactivate`, {}, { headers: getAuthHeader() });
  return response.data;
};
