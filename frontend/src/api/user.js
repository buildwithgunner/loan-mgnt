import { apiClient } from './client';

/**
 * Request account activation from the admin.
 */
export const requestActivation = () =>
  apiClient('/dashboard/request-activation', { method: 'POST' });
