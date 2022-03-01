/* eslint-disable @typescript-eslint/no-unused-vars */
// import { RadioGroup } from '@headlessui/react';
// import { StarIcon } from '@chakra-ui/icons';
// import { Box, Icon, Badge, Text } from '@chakra-ui/react';
// import { HomeIcon } from '@heroicons/react/solid';
import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  Badge,
} from '@chakra-ui/react';
import { XIcon, UserIcon } from '@heroicons/react/solid';
import { filter } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { FixedSizeList as List } from 'react-window';

import { Link, Spinner } from '@/components/Elements';
import { PatientListCard } from '@/components/Elements/PatientListCard/PatientListCard';
import { usePatientStore } from '@/stores/patients';

import { usePatients } from '../api/getPatients';
import { Patient } from '../types';

// import { Patient } from '../types';

export const PatientsList = () => {
  // const { clinic_user_id } = useParams();

  const { data, isLoading } = usePatients();

  const { patients, setPatients, setSelectedPatientId, selectedPatientId } = usePatientStore();

  // const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const [filterString, setFilterString] = useState<string>('');

  // setSelectedPatientId(clinic_user_id ? parseInt(clinic_user_id) : 0);

  const searchFor: (patient: Patient, filter: string) => boolean = (patient, searchTerm) => {
    searchTerm = searchTerm.toLowerCase().replaceAll('#', '');

    return (
      !searchTerm ||
      patient.user_name.toLowerCase().includes(searchTerm) ||
      patient.clinic_user_id.toString().includes(searchTerm) ||
      patient.clinic_user_id === selectedPatientId ||
      moment
        .unix(+patient.dob)
        .format('YYYY/MM/DD')
        .includes(searchTerm)
    );
  };

  // useEffect(() => {}, [selectedPatientId]);

  useEffect(() => {
    if (data) setPatients(data);
  }, [data, setPatients]);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) return null;

  // if (clinic_user_id) {
  //   console.log('selectedPatientId', parseInt(clinic_user_id));
  //   setSelectedPatientId(parseInt(clinic_user_id));
  // }

  const filteredPatients = patients.filter((p) => {
    return p.is_active === '1' && searchFor(p, filterString);
  });

  const Row = ({ data, index, style }: any) => {
    const { filteredPatients, selectedPatientId } = data;
    return (
      <div style={style}>
        <Link to={`/app/patients/${filteredPatients[index].clinic_user_id}`}>
          <PatientListCard
            key={filteredPatients[index].clinic_user_id}
            patient={filteredPatients[index]}
            clickHandler={() => {
              setSelectedPatientId(filteredPatients[index].clinic_user_id);
            }}
            isSelected={selectedPatientId === filteredPatients[index].clinic_user_id ? true : false}
          ></PatientListCard>
        </Link>
      </div>
    );
  };

  return (
    <Box w="full" bg="white">
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none" color="gray.400" fontSize="1.2em">
          <Icon as={UserIcon} w={6} h={6} />
        </InputLeftElement>
        <Input
          background="white"
          placeholder="Filter (Name, ID, DOB)"
          onChange={(e) => setFilterString(e.target.value)}
          value={filterString}
        />
        <InputRightElement>
          {filterString ? (
            <div className="mx-auto flex-shrink-0 flex items-center justify-center rounded bg-red-400 h-5 w-5">
              <XIcon
                onClick={() => {
                  setFilterString('');
                }}
                cursor="pointer"
                className="h-4 w-4 text-white"
                aria-hidden="true"
              />
            </div>
          ) : (
            // <Badge
            //   variant="outline"
            //   cursor="pointer"
            //   colorScheme="blue"
            //   mr="12"
            //   size="xs"
            //   onClick={() => {
            //     setFilterString('');
            //   }}
            //   textTransform="lowercase"
            // >
            //   Clear Filter
            // </Badge>
            ''
          )}
        </InputRightElement>
      </InputGroup>

      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List pt-20"
            height={height - 40}
            itemData={{ filteredPatients: filteredPatients, selectedPatientId: selectedPatientId }}
            itemCount={filteredPatients.length}
            itemSize={115}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </Box>
  );
};
