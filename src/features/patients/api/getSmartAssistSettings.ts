import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { SmartAssistSettings } from '../types/smartAssist';

export type GetSmartAssistSettingsResponse = {
  success?: string;
  error?: string;
  sa_settings?: SmartAssistSettings;
};

export const getSmartAssistSettings = ({
  clinic_user_id,
}: {
  clinic_user_id: number;
}): Promise<GetSmartAssistSettingsResponse> => {
  return axios.post('/vue_api/get_sa_settings', { clinic_user_id: clinic_user_id });
};

type UseSmartAssistSettingsOptions = {
  clinic_user_id: number;
  config?: QueryConfig<typeof getSmartAssistSettings>;
};

export const useSmartAssistSettings = ({
  config,
  clinic_user_id,
}: UseSmartAssistSettingsOptions) => {
  return useQuery({
    ...config,
    cacheTime: 0,
    queryKey: ['saSettings', clinic_user_id],
    queryFn: () => getSmartAssistSettings({ clinic_user_id }),
  });
};
