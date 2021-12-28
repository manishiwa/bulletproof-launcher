import { Box, Icon, Badge, Text } from '@chakra-ui/react';
import { HomeIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';

import { Patient } from '@/features/patients';
import { usePatientStore } from '@/stores/patients';

type PatientListCardProps = {
  patient: Patient;
  isSelected: boolean;
  clickHandler?: () => void;
};

export const PatientListCard = ({ patient, clickHandler }: PatientListCardProps) => {
  const { selectedPatientId } = usePatientStore();
  const [isSelectedRow, setIsSelectedRow] = useState(false);

  useEffect(() => {
    setIsSelectedRow(selectedPatientId == patient.clinic_user_id);
  }, [patient.clinic_user_id, selectedPatientId]);

  const textColor = isSelectedRow ? 'blue.500' : 'gray.900';
  const colorScheme = isSelectedRow ? 'blue' : 'gray';
  const infoColor = isSelectedRow ? 'gray.800' : 'gray.500';
  const boxShadow = isSelectedRow ? 'outline' : 'none';
  const boxShadowHover = isSelectedRow
    ? 'rgba(66, 153, 225, 1.0) 0px 0px 0px 3px'
    : 'rgb(200,200,200) 0px 0px 0px 3px';

  return (
    <Box
      color={infoColor}
      borderWidth="0px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
      boxShadow={boxShadow}
      onClick={() => {
        if (clickHandler) clickHandler();
      }}
      cursor="pointer"
      role="group"
      _hover={{
        boxShadow: boxShadowHover,
      }}
      m="1"
    >
      <Box px="4" py="4">
        <Box display="flex" justifyContent="space-between">
          <Box
            color={textColor}
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

        {/* <Box>
          <Box
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="0"
            display="flex"
          >
            {patient.medical_record_num ? (
              <>
                <Text fontWeight="semibold">CUSTOM ID:</Text> &nbsp;{' '}
                <Text fontWeight="normal">{patient.medical_record_num}</Text>
              </>
            ) : (
              <Text fontWeight="semibold"> &nbsp; </Text>
            )}
          </Box>
        </Box> */}

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
            colorScheme={colorScheme}
            variant="outline"
            textTransform="uppercase"
            className="font-mono"
            _groupHover={{
              color: 'blue.500',
              outlineColor: 'red',
            }}
          >
            <Icon as={HomeIcon} mb="1" mr="1" ml="0" />
            {patient.home_activation_code}
          </Badge>
        </Box>
      </Box>
    </Box>
  );
};
