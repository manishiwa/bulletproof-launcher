import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

// type VVPTestConfig = {
//   AudioMode: string;
//   ControlMode: string;
//   FixationAssist: string;
//   Layout: string;
//   LayoutType: string;
//   TestDurationLimitSec: string;
//   TestEyes: string;
//   TutorialEnabled: boolean;
// };

type GetSmartAssistConfigResponse = {
  sa_config: SmartAssistConfigRow[];
  success: string;
};

type SmartAssistConfigRow = {
  branch_name: string;
  branch_description: string;
  session_timeout: number;
  track_name: string;
  stage_name: number;
  track_priority: number;
  entry_trigger: string;
  forward_trigger: string;
  backward_trigger: string;
  activity_name: string;
  activity_time_limit: number;
  activity_scene: string;
  activity_template_mods: string;
  activity_global_mods: string;
  sa_branch_id: number;
  sa_stage_id: number;
  sa_activity_id: number;
};

export type SmartAssistConfigData = SmartAssistConfigRow[];

export const getSmartAssistConfig = (): Promise<SmartAssistConfigData> => {
  return axios.post('/vue_api/get_sa_config').then((resp: GetSmartAssistConfigResponse | any) => {
    const data: SmartAssistConfigData = resp.sa_config;
    return data;
  });
};

type UseSmartAssistConfigOptions = {
  config?: QueryConfig<typeof getSmartAssistConfig>;
};

export const useSmartAssistConfig = ({ config }: UseSmartAssistConfigOptions) => {
  return useQuery({
    ...config,
    cacheTime: 0,
    queryKey: ['saConfig'],
    queryFn: () => getSmartAssistConfig(),
  });
};
