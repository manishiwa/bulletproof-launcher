import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  FormControl,
  FormLabel,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Select,
  Button,
  VStack,
  Flex,
  Spacer,
  HStack,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  FormHelperText,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SmartAssistConfiguration } from './smartAssist/SmartAssistConfiguration';

export const PatientNotifications = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    // console.log(config);
    // setTestConfigMutation.mutate({ clinic_user_id: selectedPatientId, test_config: config });
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack className="space-y-2">
          <Box rounded="md" border="2px" borderColor="gray.300" w="full" p="3">
            <FormControl>
              <Box display="flex">
                <FormLabel fontWeight="semibold" htmlFor="SessionDelayEnabled">
                  Session Delay
                </FormLabel>
                <Switch></Switch>
              </Box>
              <FormHelperText mt="0" mb="2">
                Sends a Notification when the Patient has <b>not started</b> a Session within{' '}
                <b>X hours</b> of the previous Session&apos;s start time.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="SessionDelayHours" fontSize="sm">
                How many Hours?
              </FormLabel>
              <NumberInput step={1} defaultValue={48} min={1} max={1024} w="20" size="sm">
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Box>
          <Box rounded="md" border="2px" borderColor="gray.300" w="full" p="3">
            <FormControl>
              <Box display="flex">
                <FormLabel fontWeight="semibold" htmlFor="SessionStart">
                  Session Started Too Soon
                </FormLabel>
                <Switch></Switch>
              </Box>
              <FormHelperText mt="0" mb="2">
                Sends a Notification when the Patient has <b>started</b> a Session within{' '}
                <b>X hours</b> of the previous Session&apos;s start time.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="SessionDelayHours" fontSize="sm">
                How many Hours?
              </FormLabel>
              <NumberInput step={1} defaultValue={8} min={1} max={1024} w="20" size="sm">
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Box>
          <Box rounded="md" border="2px" borderColor="gray.300" w="full" p="3">
            <FormControl>
              <Box display="flex">
                <FormLabel fontWeight="semibold" htmlFor="SessionStart">
                  Bubbles Performance Regression
                </FormLabel>
                <Switch></Switch>
              </Box>
              <FormHelperText mt="0">
                Sends a Notification when the Patient&apos;s stereoacuity estimate in Bubbles drops
                by a factor of <b>3</b> from the best value measured.
              </FormHelperText>
            </FormControl>
          </Box>
          <Box rounded="md" border="2px" borderColor="gray.300" w="full" p="3">
            <FormControl>
              <Box display="flex">
                <FormLabel fontWeight="semibold" htmlFor="SessionStart">
                  Stereoacuity Measurement Regression
                </FormLabel>
                <Switch></Switch>
              </Box>
              <FormHelperText mt="0">
                Sends a Notification when the Patient&apos;s stereoacuity measurement in
                Stereoacuity Test drops by <b>5 CSD</b> units from the best value measured.
              </FormHelperText>
            </FormControl>
          </Box>
          <Flex width="full" className="flex flex-row" pt="10">
            <Button
            // className="w-full"
            // onClick={() => setConfig(fetchedData.test_config)}
            // disabled={revertButtonDisabledState}
            >
              Revert Changes
            </Button>
            <Spacer />
            <Button
            // isLoading={setTestConfigMutation.isLoading}
            // type="submit"
            // className="w-full"
            // disabled={saveButtonDisabledState}
            >
              Save Changes
            </Button>
          </Flex>
        </VStack>
      </form>
    </>
  );
};
