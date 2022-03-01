import { Flex, FormControl, FormHelperText, FormLabel, Text, Box, Badge } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import * as React from 'react';
import Moment from 'react-moment';

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

export const PatientSelect = ({ children }: ContentLayoutProps) => {
  const { patients, selectedPatient } = usePatientStore();

  return (
    <Flex justify="center" align="center" w="full">
      <FormControl w="60">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <AutoComplete openOnFocus>
          <AutoCompleteInput variant="filled" />
          <AutoCompleteList>
            {patients.map((patient) => (
              <AutoCompleteItem
                key={`option-${patient.clinic_user_id}`}
                value={patient.clinic_user_id}
                textTransform="capitalize"
              >
                <Box px="4" py="4">
                  <Box display="flex" justifyContent="space-between">
                    <Box
                      mt="0"
                      mb="0.5"
                      fontWeight="semibold"
                      fontSize="lg"
                      as="h2"
                      lineHeight="tight"
                      isTruncated
                    >
                      {patient.user_name}
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                    <Box
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="0"
                      display="flex"
                    >
                      <Text fontWeight="semibold">Patient ID:</Text> &nbsp;{' '}
                      <Text fontWeight="normal">#{patient.clinic_user_id}</Text>
                    </Box>
                    <Box
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="0"
                      display="flex"
                    >
                      <Text fontWeight="semibold">DOB:</Text> &nbsp;{' '}
                      <Text fontWeight="normal">
                        <Moment format="Y-M-D" unix>
                          {patient.dob}
                        </Moment>
                      </Text>
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                    <Box
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="0.6rem"
                      ml="0"
                      mb="-1"
                      display="flex"
                      lineHeight="0.55rem"
                    >
                      <Text fontWeight="normal">Last Activity was </Text> &nbsp;{' '}
                      <Text fontWeight="normal">
                        {patient.last_played === '0' ? (
                          'unknown'
                        ) : (
                          <Moment fromNow unix>
                            {patient.last_played}
                          </Moment>
                        )}
                      </Text>
                    </Box>
                    <Badge
                      mt="2"
                      mb="-1"
                      size="sm"
                      fontSize="sm"
                      px="2"
                      borderRadius="sm"
                      variant="outline"
                      textTransform="uppercase"
                      className="font-mono"
                      _groupHover={{
                        color: 'blue.500',
                        outlineColor: 'red',
                      }}
                    >
                      {patient.home_activation_code}
                    </Badge>
                  </Box>
                </Box>
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl>
    </Flex>
  );
};
