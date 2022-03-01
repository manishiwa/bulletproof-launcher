import { useQuery } from 'react-query';
import { StringLiteralLike } from 'typescript';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export type MeasurementsRow = {
  doctor_id: number;
  clinic_user_id: number;
  type: string;
  is_valid: number;
  timestamp: number;
  measurements_json: CoverTestMeasurement | any;
  measurement_id: number;
};

type CoverTestMeasurement = {
  Date: Date;
  Eye: string;
  Distance: string;
  Direction: string;
  Tropia: string;
  Magnitude: number;
  Type: string;
  Subtype: string;
  Comitancy: string;
};

type GetMeasurementsResponse = {
  measurements: MeasurementsRow[];
  error?: string;
  success?: string;
};

export type MeasurementsData = MeasurementsRow[];

export const getMeasurements = (clinic_user_id: number): Promise<MeasurementsData> => {
  return axios
    .post('/vue_api/get_measurements', { clinic_user_id: clinic_user_id })
    .then((resp: GetMeasurementsResponse | any) => {
      const data: MeasurementsData = resp.measurements;
      return data;
    });
};

type UseMeasurementsOptions = {
  clinic_user_id: number;
  config?: QueryConfig<typeof getMeasurements>;
};

export const useMeasurements = ({ config, clinic_user_id }: UseMeasurementsOptions) => {
  return useQuery({
    ...config,
    cacheTime: 0,
    queryKey: ['gameSetting', clinic_user_id],
    queryFn: () => getMeasurements(clinic_user_id),
  });
};
