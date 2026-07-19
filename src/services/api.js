import axios from 'axios';

/**
 * Axios instance pre-configured with the base URL.
 * All API calls should use this instance.
 *
 * Base URL points to a local JSON server.
 * API integration will be implemented by other team members.
 */
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
