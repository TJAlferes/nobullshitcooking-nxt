import axios from 'axios';

export const endpoint = process.env.NODE_ENV === 'production'
  ? 'https://nobsc-api-1.com/v1'
  : 'http://localhost:3003/v1';

export const axiosInstance = axios.create({
  validateStatus: (status) => status >= 200 && status < 500,
  withCredentials: true,
  withXSRFToken: true,  //  // TO DO: read axios source code
  xsrfCookieName: process.env.NODE_ENV === 'production'
    ? '__Host-psifi.x-csrf-token'
    : 'x-csrf-token',
  xsrfHeaderName: 'X-CSRF-TOKEN'
});

export function protectedApi(csrfToken: string) {
  return {
    csrfToken,
    
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
      const res = await axiosInstance.post(
        `${endpoint}${path}`,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          }
        }
      );
  
      return res;
    },

    async patch(path: string, body: any = {}) {
      const res = await axiosInstance.patch(
        `${endpoint}${path}`,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          }
        }
      );
  
      return res;
    },

    async delete(path: string) {
      const res = await axiosInstance.delete(
        `${endpoint}${path}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          }
        }
      );
  
      return res;
    }
  };
}
