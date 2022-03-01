import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { VVPTestConfig } from '../types/vvp';

export type SetTestConfigResponse = {
  success?: string;
  error?: string;
  test_config?: VVPTestConfig;
};

export type SetTestConfigDTO = {
  clinic_user_id: number;
  test_config: VVPTestConfig;
};

export const setTestConfig = ({
  clinic_user_id,
  test_config,
}: SetTestConfigDTO): Promise<SetTestConfigResponse> => {
  return axios.post('/vue_api/set_test_config', {
    clinic_user_id: clinic_user_id,
    test_config: test_config,
  });
};

type UseSetTestConfigOptions = {
  config?: MutationConfig<typeof setTestConfig>;
};

export const useSetVVPTestConfig = ({ config }: UseSetTestConfigOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries('testConfigs');

      const previousTestConfig = queryClient.getQueryData<VVPTestConfig>([
        'testConfigs',
        data.clinic_user_id,
      ]);

      queryClient.setQueryData('testConfigs', data.clinic_user_id);

      return { previousTestConfig };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData('testConfigs', context.previousUsers);
      }
    },
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries(['testConfigs', vars.clinic_user_id]);
      addNotification({
        type: 'success',
        title: 'Test Config Updated',
      });
    },
    ...config,
    mutationFn: setTestConfig,
  });
};
