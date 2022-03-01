import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { SmartAssistSettings } from '../types/smartAssist';

export type SetSmartAssistSettingsResponse = {
  success?: string;
  error?: string;
  sa_settings?: SmartAssistSettings;
};

export type SetSmartAssistSettingsDTO = {
  clinic_user_id: number;
  sa_settings: SmartAssistSettings;
};

export const setSmartAssistSettings = ({
  clinic_user_id,
  sa_settings,
}: SetSmartAssistSettingsDTO): Promise<SetSmartAssistSettingsResponse> => {
  return axios.post('/vue_api/set_sa_settings', {
    clinic_user_id: clinic_user_id,
    sa_settings: sa_settings,
  });
};

type UseSetSmartAssistSettingsOptions = {
  config?: MutationConfig<typeof setSmartAssistSettings>;
};

export const useSetSmartAssistSettings = ({ config }: UseSetSmartAssistSettingsOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries('saSettings');

      const previousTestConfig = queryClient.getQueryData<SmartAssistSettings>([
        'saSettings',
        data.clinic_user_id,
      ]);

      queryClient.setQueryData('saSettings', data.clinic_user_id);

      return { previousTestConfig };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData('saSettings', context.previousUsers);
      }
    },
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries(['saSettings', vars.clinic_user_id]);
      addNotification({
        type: 'success',
        title: 'Smart Assist Settings updated',
      });
    },
    ...config,
    mutationFn: setSmartAssistSettings,
  });
};
