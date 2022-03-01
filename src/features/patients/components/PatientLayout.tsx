import { Box, Text, Flex, Spacer, Badge, Icon } from '@chakra-ui/react';
import { HomeIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import * as React from 'react';
import Moment from 'react-moment';
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
              'group flex items-center px-3 py-3 text-base font-medium rounded-md rounded-b-none md:flex-col'
            )}
            activeClassName="bg-white text-indigo-400 hover:bg-white"
          >
            {item.name}
          </NavLink>
        ))}
      </>
    );
  };

  const TabNavigation = () => {
    // const { checkAccess } = useAuthorization();
    const navigation = [
      { name: 'Configuration', to: './configuration' },
      { name: 'Notifications', to: './notifications' },
      { name: 'Measurements', to: './measurements' },
      { name: 'Data', to: './results' },
      // { name: 'Results', to: './results' },
      // { name: 'Perimetry Test', to: './perimetry' },
    ].filter(Boolean) as SideNavigationItem[];

    return (
      <>
        {navigation.map((item, index) => (
          <NavLink
            end={index === 0}
            key={item.name}
            to={item.to}
            className={clsx(
              'text-sm lg:text-base font-medium hover:bg-gray-300 hover:text-gray-800 active:bg-blue-800 active:text-white',
              'group flex items-center px-3 py-2 text-base font-medium rounded-md md:flex-col'
            )}
            activeClassName="bg-blue-800 text-white hover:bg-blue-300"
          >
            {item.name}
          </NavLink>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full overflow-auto">
        <Box background="white" m="4" mb="2" className="p-3 md:p-4" width="auto" rounded="md">
          <Flex w="full">
            <Text className="text-md font-bold text-blue-700 md:text-3xl" isTruncated>
              {selectedPatient?.user_name}
            </Text>
            <Spacer />
            <Box
              textTransform="uppercase"
              className="font-mono bg-blue-100 rounded-sm md:rounded-md text-blue-800 font-bold"
            >
              <Text className="text-md px-1 py-0 md:text-2xl md:px-2 md:mt-0.5">
                <Icon as={HomeIcon} className="mr-0.5 mb-1 md:mr-1 md:mb-1" />
                <Text display="inline" className="">
                  {selectedPatient?.home_activation_code}
                </Text>
              </Text>
            </Box>
          </Flex>
          <Flex
            flexWrap="wrap"
            borderRadius="md"
            color="blue.600"
            mt="5"
            mb="5"
            className="text-[.7rem] md:text-xs"
          >
            <Box textTransform="uppercase" display="flex" mr="2">
              <Text fontWeight="semibold">Patient ID:</Text> &nbsp;{' '}
              <Text>#{selectedPatient?.clinic_user_id}</Text>
            </Box>
            <Spacer />
            <Box textTransform="uppercase" display="flex" mr="2">
              <Text fontWeight="semibold">DOB:</Text> &nbsp;{' '}
              <Moment format="Y-MM-DD" unix>
                {selectedPatient?.dob}
              </Moment>
            </Box>
            <Spacer />
            <Box textTransform="uppercase" display="flex">
              <Text fontWeight="semibold">Last Activity:</Text> &nbsp;{' '}
              <Text fontWeight="normal">
                {selectedPatient?.last_played === '0' ? (
                  'unknown'
                ) : (
                  <Moment fromNow unix>
                    {selectedPatient?.last_played}
                  </Moment>
                )}
              </Text>
            </Box>
          </Flex>
          {/* <div className="p-3">
              <nav className="p-0 space-x-2 md:flex">
                <PatientNavigation />
              </nav>
            </div> */}
          <Box>
            <nav className="p-0 space-y-1 md:space-x-2 md:space-y-0 md:flex">
              <TabNavigation />
            </nav>
          </Box>

          <div className="py-3">
            <div className="mx-auto">{children}</div>
          </div>
        </Box>
      </div>
    </>
  );
};
