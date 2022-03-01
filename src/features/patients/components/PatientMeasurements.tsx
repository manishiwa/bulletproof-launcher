import { Box } from '@chakra-ui/react';

import { usePatientStore } from '@/stores/patients';

import { useMeasurements } from '../api/getMeasurements';

import { CoverTestMeasurementsTable } from './BV/CoverTestMeasurements';

export const PatientMeasurements = () => {
  const { selectedPatientId } = usePatientStore();
  const { data: measurementsData, isLoading: measurementsLoading } = useMeasurements({
    clinic_user_id: selectedPatientId,
  });

  console.log(measurementsData);

  return (
    <>
      {measurementsData && (
        <CoverTestMeasurementsTable
          input={measurementsData.filter((r) => r.type === 'Cover Test')}
        ></CoverTestMeasurementsTable>
      )}
      <Box></Box>
    </>
  );
};
