import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Patient } from '../types';

export const getPatients = (): Promise<Patient[]> => {
  return axios.get(`/vue_api/get_patients`);
};

type UseUsersOptions = {
  config?: QueryConfig<typeof getPatients>;
};

export const usePatients = ({ config }: UseUsersOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['users'],
    queryFn: () => getPatients(),
  });
};
