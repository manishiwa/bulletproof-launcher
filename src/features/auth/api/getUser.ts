import { axios } from '@/lib/axios';

import { UserInfo } from '../types';

export const getUser = (): Promise<UserInfo> => {
  return axios.get('/vue_api/is_logged_in');
};
