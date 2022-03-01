import { Box } from '@chakra-ui/react';
import clsx from 'clsx';
import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';

// import { ROLES, useAuthorization } from '@/lib/authorization';
import { usePatientStore } from '@/stores/patients';

import { PatientSelect } from './PatientSelect';

// import { Head } from '../../../components/Head';

type ContentLayoutProps = {
  children: React.ReactNode;
  //   title: string;
};

type SideNavigationItem = {
  name: string;
  to: string;
};

export const PatientNavigation = () => {
  const { selectedPatientId } = usePatientStore();
  const { clinic_user_id } = useParams();

  const navigation = [
    { name: 'Configuration', to: `./${selectedPatientId}/configuration` },
    { name: 'Measurements', to: `./${selectedPatientId}/measurements` },
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
