import { axios } from '@/lib/axios';

import { LoginAPIResponse } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO
): Promise<LoginAPIResponse> => {
  return axios.post('/auth/register', data);
};
