import { Box } from '@chakra-ui/react';
import clsx from 'clsx';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

// import { ROLES, useAuthorization } from '@/lib/authorization';
import { usePatientStore } from '@/stores/patients';

import { PatientsList } from '../components/PatientsListBlue';

// import { Head } from '../../../components/Head';

type ContentLayoutProps = {
  children: React.ReactNode;
  //   title: string;
};

type SideNavigationItem = {
  name: string;
  to: string;
};

export const PatientInfo = () => {
  const { selectedPatient } = usePatientStore();

  return (
    <>
      <div className="h-screen flex overflow-hidden">
        <Box className="hidden flex-col w-80 md:flex md:flex-shrink-0 ">
          <div className="flex flex-col h-0 flex-1">
            <Box className="flex-1 p-0 space-y-0 w-full">
              <PatientsList />
            </Box>
          </div>
        </Box>
        <div className="flex flex-col w-full overflow-auto">
          {/* <Box background="white" m="4" mb="2" width="auto" rounded="md">
            <div className="py-3">
              <div className=" mx-auto px-4 sm:px-3 md:px-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {selectedPatient?.user_name}
                </h1>
              </div>
            </div>
          </Box> */}
          <Box mx="4" my="4" width="auto" rounded="md">
            <div className="px-2 pt-2">
              <nav className="p-0 space-x-2 md:flex"></nav>
            </div>
          </Box>
          <Box
            background="white"
            m="4"
            mt="0"
            width="auto"
            rounded="md"
            flex="flex"
            roundedTopLeft="0"
          >
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">Please select a Patient</div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};
