import axios from 'axios';

export const endpoint = process.env.NODE_ENV === 'production'
  ? 'https://nobsc-api-1.com/v1'
  : 'http://localhost:3003/v1';

export const axiosInstance = axios.create({
  xsrfCookieName: '__Host-psifi.x-csrf-token',
  xsrfHeaderName: 'X-CSRF-TOKEN'
});
