import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { VVPTestConfig } from '../types/vvp';

export type GetTestConfigResponse = {
  game_settings?: any[];
  success: string;
  test_config: VVPTestConfig;
};

export const getTestConfig = ({
  clinic_user_id,
}: {
  clinic_user_id: number;
}): Promise<GetTestConfigResponse> => {
  return axios.post('/vue_api/get_test_config', { clinic_user_id: clinic_user_id });
};

type UseTestConfigOptions = {
  clinic_user_id: number;
  config?: QueryConfig<typeof getTestConfig>;
};

export const useTestConfig = ({ config, clinic_user_id }: UseTestConfigOptions) => {
  return useQuery({
    ...config,
    cacheTime: 0,
    queryKey: ['testConfig', clinic_user_id],
    queryFn: () => getTestConfig({ clinic_user_id }),
  });
};
