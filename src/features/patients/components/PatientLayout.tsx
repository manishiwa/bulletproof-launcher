import { Box } from '@chakra-ui/react';
import clsx from 'clsx';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

// import { ROLES, useAuthorization } from '@/lib/authorization';
import { usePatientStore } from '@/stores/patients';

// import { Head } from '../../../components/Head';

type ContentLayoutProps = {
  children: React.ReactNode;
  //   title: string;
};

type SideNavigationItem = {
  name: string;
  to: string;
};

export const PatientLayout = ({ children }: ContentLayoutProps) => {
  const { selectedPatient } = usePatientStore();

  const PatientNavigation = () => {
    // const { checkAccess } = useAuthorization();
    const navigation = [
      { name: 'Configuration', to: './configuration' },
      { name: 'Measurements', to: './measurements' },
      { name: 'Results', to: './results' },
      { name: 'Perimetry Test', to: './perimetry' },
    ].filter(Boolean) as SideNavigationItem[];

    return (
      <>
        {navigation.map((item, index) => (
          <NavLink
            end={index === 0}
            key={item.name}
            to={item.to}
            className={clsx(
              'text-gray-400  hover:bg-gray-100 hover:text-indigo-400 active:bg-gray-100',
              'group flex items-center px-3 py-3 text-base font-medium rounded-md rounded-b-none sm:flex-col'
            )}
            activeClassName="bg-white text-indigo-400 hover:bg-white"
          >
            {item.name}
          </NavLink>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Box background="white" m="4" mb="2" width="auto" rounded="md">
          <div className="py-3">
            <div className=" mx-auto px-4 sm:px-3 md:px-4">
              <h1 className="text-2xl font-semibold text-gray-900">{selectedPatient?.user_name}</h1>
            </div>
            {/* <div className="p-3">
              <nav className="p-0 space-x-2 md:flex">
                <PatientNavigation />
              </nav>
            </div> */}
          </div>
        </Box>
        <Box mx="2" my="0" width="auto" rounded="md">
          <div className="px-2 pt-2">
            <nav className="p-0 space-x-2 md:flex">
              <PatientNavigation />
            </nav>
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </Box>
      </div>
    </>
  );
};
