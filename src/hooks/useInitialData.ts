import axios from 'axios';
import { useQuery } from 'react-query';

import { NOBSCAPI as endpoint } from '../config/NOBSCAPI';

export async function getInitialData() {
  const { data } = await axios.get(`${endpoint}/data-init`);
  return data;
}

export function useInitialData() {
  return useQuery("initialData", getInitialData);
}