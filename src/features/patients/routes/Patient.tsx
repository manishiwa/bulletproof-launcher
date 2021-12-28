// import { Navigate, Route, Routes } from 'react-router-dom';

// import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import { usePatientStore } from '@/stores/patients';

// import { ContentLayout } from '@/components/Layout/ContentLayout';
// import { Authorization } from '@/lib/authorization';

import { PatientConfiguration } from '../components/PatientConfiguration';
// import { PatientInfo } from '../components/PatientInfo';
import { PatientLayout } from '../components/PatientLayout';
import { PatientsList } from '../components/PatientsList';

// import { Configuration } from './Configuration';
// import { PatientsList } from '../components/PatientsList';

export const Patient = () => {
  const { clinic_user_id } = useParams();

  const { selectedPatientId, setSelectedPatientId } = usePatientStore();
  useEffect(() => {
    const cuid = parseInt(clinic_user_id);
    if (selectedPatientId != cuid) setSelectedPatientId(cuid);
  }, [clinic_user_id, selectedPatientId, setSelectedPatientId]);

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="hidden flex-col w-80 md:flex md:flex-shrink-0 ">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex-1 p-4 pr-0 space-y-2 w-full">
            <PatientsList />
          </div>
        </div>
      </div>
      <PatientLayout>
        <div className="mt-4">
          {/* <PatientsHome /> */}
          <Routes>
            <Route path="configuration" element={<PatientConfiguration />} />
            <Route path="*" element={<Navigate to="configuration" />} />
          </Routes>
        </div>
      </PatientLayout>
    </div>
  );
};
