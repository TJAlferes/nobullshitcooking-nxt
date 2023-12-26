import axios from 'axios';

export const endpoint = process.env.NODE_ENV === 'production'
  ? 'https://nobsc-api-1.com/v1'
  : 'http://localhost:3003/v1';

export const axiosInstance = axios.create({
  xsrfCookieName: '__Host-psifi.x-csrf-token',
  xsrfHeaderName: 'X-CSRF-TOKEN'
});

export const api = {
  async get(path: string, withCredentials = true) {
    const res = await axiosInstance.get(
      `${endpoint}${path}`,
      {
        withCredentials
      }
    );

    return res;
  },

  async post(path: string, body: any = {}) {
    const { data: { csrfToken } } = await axiosInstance.get('/csrf-token');

    const res = await axiosInstance.post(
      `${endpoint}${path}`,
      body,
      {
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        withCredentials: true
      }
    );

    return res;
  },

  async patch(path: string, body: any = {}) {
    const { data: { csrfToken } } = await axiosInstance.get('/csrf-token');

    const res = await axiosInstance.patch(
      `${endpoint}${path}`,
      body,
      {
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        withCredentials: true
      }
    );

    return res;
  },

  async delete(path: string) {
    const { data: { csrfToken } } = await axiosInstance.get('/csrf-token');

    const res = await axiosInstance.delete(
      `${endpoint}${path}`,
      {
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        withCredentials: true
      }
    );

    return res;
  }
};
