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

type GetSmartAssistEventsResponse = {
  sa_events: SmartAssistEventRow[];
  success?: string;
  error?: string;
};

export type SmartAssistEventRow = {
  clinic_user_id: number;
  sa_session_number: number;
  branch_name: string;
  track_name: string;
  stage: number;
  activity_code: string;
  event_summary: string;
  timestamp: number;
  device_id: string;
  event_id: number;
};

export type SmartAssistEventsData = SmartAssistEventRow[];

export const getSmartAssistEvents = (clinic_user_id: number): Promise<SmartAssistEventsData> => {
  return axios
    .post('/vue_api/get_sa_events', { clinic_user_id: clinic_user_id })
    .then((resp: GetSmartAssistEventsResponse | any) => {
      console.log('saEventsResp', resp);
      const data: SmartAssistEventsData = resp.sa_events;
      return data;
    });
};

type UseSmartAssistConfigOptions = {
  config?: QueryConfig<typeof getSmartAssistEvents>;
  clinic_user_id: number;
};

export const useSmartAssistEvents = ({ config, clinic_user_id }: UseSmartAssistConfigOptions) => {
  return useQuery({
    ...config,
    cacheTime: 0,
    queryKey: ['saEvents', clinic_user_id],
    queryFn: () => getSmartAssistEvents(clinic_user_id),
  });
};
