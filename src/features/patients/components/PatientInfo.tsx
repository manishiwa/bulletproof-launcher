/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { UserIcon } from '@heroicons/react/solid';
import { filter } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { FixedSizeList as List } from 'react-window';

import { Spinner } from '@/components/Elements';
import { PatientListCard } from '@/components/Elements/PatientListCard/PatientListCard';
import { useAuth } from '@/lib/auth';
import { usePatientStore } from '@/stores/patients';

import { useGameSettings } from '../api/getGameSettings';
import { Patient } from '../types';
// import { Patient } from '../types';

export const PatientInfo = () => {
  const { clinic_user_id } = useParams();
  const { selectedPatient, setSelectedPatientId, patients } = usePatientStore();

  const { data, isLoading } = useGameSettings({ clinic_user_id: parseInt(clinic_user_id) });

  const [filterString, setFilterString] = useState<string>('');

  const { user } = useAuth();

  useEffect(() => {}, []);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) return null;

  console.log(data);

  return (
    <>
      <Box>{clinic_user_id}</Box>
      <h1 className="text-xl mt-2">
        <b>{`${selectedPatient?.user_name}`}</b>
      </h1>
      <h4 className="my-3">
        Your distributor is : <b>{user?.distributor}</b>
      </h4>
      <p className="font-medium">In this application you can:</p>
      {user?.is_clinical && (
        <ul className="my-4 list-inside list-disc">
          <li>Create comments in discussions</li>
          <li>Delete own comments</li>
        </ul>
      )}
      {(user?.is_admin || user?.is_mod) && (
        <ul className="my-4 list-inside list-disc">
          <li>Create discussions</li>
          <li>Edit discussions</li>
          <li>Delete discussions</li>
          <li>Comment on discussions</li>
          <li>Delete all comments</li>
        </ul>
      )}
    </>
  );
};
