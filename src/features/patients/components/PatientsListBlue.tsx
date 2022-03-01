/* eslint-disable @typescript-eslint/no-unused-vars */
// import { RadioGroup } from '@headlessui/react';
// import { StarIcon } from '@chakra-ui/icons';
// import { Box, Icon, Badge, Text } from '@chakra-ui/react';
// import { HomeIcon } from '@heroicons/react/solid';
import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Flex,
  Text,
  Badge,
} from '@chakra-ui/react';
import { XIcon, UserIcon } from '@heroicons/react/solid';
import { filter } from 'lodash';
import memoize from 'memoize-one';
import moment from 'moment';
import React, { createRef, forwardRef, memo, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useParams } from 'react-router-dom';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { FixedSizeList as List, areEqual } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { Link, Spinner } from '@/components/Elements';
import { PatientListCard } from '@/components/Elements/PatientListCard/PatientListCardBlue';
import { usePatientStore } from '@/stores/patients';

import { usePatients } from '../api/getPatients';
import { Patient } from '../types';

import { AddPatientModal } from './BV/AddPatientModal';

// import { Patient } from '../types';

export const PatientsList = () => {
  // const { clinic_user_id } = useParams();

  const { data, isLoading } = usePatients();

  const { patients, setPatients, setSelectedPatientId, selectedPatientId } = usePatientStore();

  // const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const [filterString, setFilterString] = useState<string>('');

  const [addPatientModalOpen, setAddPatientModalOpen] = useState(false);

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
        .format('Y-MM-DD')
        .includes(searchTerm)
    );
  };

  // useEffect(() => {}, [selectedPatientId]);

  useEffect(() => {
    if (data) setPatients(data);
  }, [data, setPatients]);

  if (isLoading) {
    return (
      <Box w="full" h="full" bg="gray.100" boxShadow="sm">
        <Box pt={2} pb={2} px={4} className="h-full">
          <Input
            rounded="md"
            border="none"
            background="gray.400"
            fontWeight="medium"
            color="blue.50"
            readOnly
          />
          <div className="w-full h-full bg-white rounded-md my-4 flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        </Box>
      </Box>
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

  // eslint-disable-next-line react/display-name
  const Row = memo(({ data, index, style }: any) => {
    const { filteredPatients } = data;

    return (
      <div style={{ ...style, paddingRight: '1rem', paddingLeft: '1rem' }}>
        <Link to={`/app/patients/${filteredPatients[index].clinic_user_id}/configuration`}>
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
  }, areEqual);

  const createItemData = memoize((items, toggleItemActive) => ({
    filteredPatients,
    toggleItemActive,
  }));

  const toggleItemActive = (index: number) => {
    setSelectedPatientId(filteredPatients[index].clinic_user_id);
  };
  const itemData = createItemData(filteredPatients, toggleItemActive);

  const listRef = React.createRef<any>();

  const handleScroll = ({ target }: any) => {
    const { scrollTop } = target;

    listRef.current.scrollTo(scrollTop);
  };

  const vertTrackWidthChosen = '10px'; // Original is 6px

  return (
    <>
      <Box w="full" h="full" bg="gray.100" boxShadow="sm">
        <Box pt={2} pb={2} px={4}>
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none" color="blue.50" fontSize="1.2em">
              <Icon as={UserIcon} w={6} h={6} color="blue.50" />
            </InputLeftElement>
            <Input
              rounded="md"
              border="none"
              background="gray.400"
              fontWeight="medium"
              color="blue.50"
              _placeholder={{ color: 'blue.50' }}
              placeholder="Filter (Name, ID, DOB)"
              onChange={(e) => setFilterString(e.target.value)}
              value={filterString}
            />
            <InputRightElement>
              {filterString ? (
                <div className="mx-auto flex-shrink-0 flex items-center justify-center rounded bg-blue-400 h-5 w-5">
                  <XIcon
                    onClick={() => {
                      setFilterString('');
                    }}
                    cursor="pointer"
                    className="h-4 w-4 text-blue-50"
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
        </Box>

        <AutoSizer style={{ height: '100%', width: '100%' }}>
          {({ height, width }) => (
            <Box px={0} className="max-h-full h-10">
              <Scrollbars
                autoHeight={true}
                autoHeightMax={height}
                onScroll={handleScroll}
                renderTrackVertical={({ style, ...props }) => {
                  return (
                    <div
                      {...props}
                      style={{
                        ...style,
                        width: vertTrackWidthChosen,
                        right: '2px',
                        bottom: '2px',
                        top: '2px',
                        borderRadius: '5px',
                      }}
                    />
                  );
                }}
              >
                <List
                  ref={listRef}
                  className="List"
                  height={height - 110}
                  itemData={itemData}
                  itemCount={filteredPatients.length}
                  itemSize={110}
                  width={width}
                  style={{ overflow: 'false' }}
                >
                  {Row}
                </List>
              </Scrollbars>
              <Flex pt={2} pb={2} px={4}>
                <Button colorScheme="blue" w="full" onClick={() => setAddPatientModalOpen(true)}>
                  Add Patient
                </Button>
              </Flex>
            </Box>
          )}
        </AutoSizer>
      </Box>
      <AddPatientModal
        isOpen={addPatientModalOpen}
        onClose={() => setAddPatientModalOpen(false)}
      ></AddPatientModal>
    </>
  );
};
