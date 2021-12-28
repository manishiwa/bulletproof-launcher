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

type GetVVPLayoutsResponse = {
  layouts: VVPLayout[];
  success: string;
};

type VVPLayout = {
  vvp_layout_id: number;
  type: string;
  name: string;
  display_name: string;
  version: number;
  metadata: string;
  csv: string;
  description: string;
  is_public: number;
  preview_image: string;
  summary: string;
  timestamp: string;
  author_id: number;
};

type VVPLayoutTypes = string[];
type VVPLayouts = VVPLayout[];

type VVPLayoutsData = {
  types: VVPLayoutTypes;
  layouts: VVPLayouts;
};

export const getVVPLayouts = (): Promise<VVPLayoutsData> => {
  return axios.post('/vue_api/get_vvp_layouts').then((resp: GetVVPLayoutsResponse | any) => {
    const data: VVPLayoutsData = {
      types: resp.layouts
        .map((item: VVPLayout) => item.type)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index),
      layouts: resp.layouts,
    };
    return data;
  });
};

type UseVVPLayoutsOptions = {
  config?: QueryConfig<typeof getVVPLayouts>;
};

export const useVVPLayouts = ({ config }: UseVVPLayoutsOptions) => {
  return useQuery({
    ...config,
    cacheTime: 0,
    queryKey: ['vvpLayouts'],
    queryFn: () => getVVPLayouts(),
  });
};
