// import { AxiosResponse } from 'axios';

import md5 from 'md5';

import { axios } from '@/lib/axios';

import { LoginAPIResponse } from '../types';

export type LoginCredentialsDTO = {
  u: string;
  p: string;
};

export const loginWithUsernameAndPassword = (
  data: LoginCredentialsDTO
): Promise<LoginAPIResponse> => {
  return axios
    .post<LoginAPIResponse>('/vue_api/log_in', {
      u: data.u,
      p: md5(data.p),
    })
    .then((resp: any) => {
      console.log('loginWithUsernameAndPassword::resp', resp);
      return resp;
    });
};
