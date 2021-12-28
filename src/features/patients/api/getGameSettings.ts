import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

type VVPTestConfig = {
  AudioMode: string;
  ControlMode: string;
  FixationAssist: boolean;
  Layout: string;
  LayoutType: string;
  TestDurationLimitSec: string;
  TestEyes: string;
  TutorialEnabled: boolean;
};

type GetGameSettingsResponse = {
  game_settings?: any[];
  success: string;
  test_config: VVPTestConfig;
};

export const getGameSettings = ({
  clinic_user_id,
}: {
  clinic_user_id: number;
}): Promise<GetGameSettingsResponse> => {
  return axios.post('/vue_api/get_test_config', { clinic_user_id: clinic_user_id });
};

type UseGameSettingsOptions = {
  clinic_user_id: number;
  config?: QueryConfig<typeof getGameSettings>;
};

export const useGameSettings = ({ config, clinic_user_id }: UseGameSettingsOptions) => {
  return useQuery({
    ...config,
    cacheTime: 0,
    queryKey: ['gameSetting', clinic_user_id],
    queryFn: () => getGameSettings({ clinic_user_id }),
  });
};
