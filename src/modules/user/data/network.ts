import axios from 'axios';

import { endpoint } from '../../../config/api';
import { setItem }  from '../../general/localStorage';

// move to an api.ts ???
// TO DO: move useUserDataFetcher to store
// keep useDataFetcher here

export async function getInitialUserData() {
  try {
    const { data } = await axios.post(
      `${endpoint}/user/initial-data`,
      {},
      {withCredentials: true}
    );
    for (const [ key, value ] of Object.entries(data)) {
      setItem(key, value);
    }
  } catch (err: any) {
    if (err.response) {
      // Server responded with a status code outside of 2xx
      console.log(err.response.status, err.response.data, err.response.headers);
    } else if (err.request) {
      // No response was received -- `err.request` is:
      // an instance of XMLHttpRequest in the browser,
      // an instance of http.ClientRequest in node.js
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
    console.log(err.config);
  }
}
