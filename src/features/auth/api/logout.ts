import { axios } from '@/lib/axios';

// import { LoginAPIResponse } from '../types';

export const logout = (): Promise<any> => {
  return axios.post('/vue_api/log_out');
};
