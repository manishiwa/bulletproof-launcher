import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  UseModalProps,
  Button,
  HStack,
  VStack,
  Input,
  FormLabel,
  FormErrorMessage,
  FormControl,
  Alert,
  AlertIcon,
  AlertDescription,
  Select,
  Switch,
  Box,
  Flex,
  SimpleGrid,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { DatePicker } from '@orange_digital/chakra-datepicker';

import { RadioCardSelect } from '../../../../components/Form/RadioCard';

export const AddPatientModal: React.FC<UseModalProps> = ({ isOpen, onClose }) => {
  const newPatientDefaults = {
    user_name: '',
    custom_id: '',
    dob: '',
    dominant_eye: '',
    gender: '',
    ethnicity: '',
    has_amblyopia: false,
    has_strabismus: false,
    notes: '',
  };

  const [patientFields, setPatientFields] = useState(newPatientDefaults);

  const formRef = React.createRef<HTMLFormElement>();

  const submitForm = () => {
    formRef.current?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    console.log('values', values);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     // resolve();
    //   }, 3000);
    // });
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="56rem">
          <ModalHeader>Add Patient Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
              <SimpleGrid columns={2} spacingX={10} spacingY={5}>
                <FormControl isInvalid={errors.user_name} isRequired>
                  <FormLabel htmlFor="user_name">Username</FormLabel>
                  <Input
                    id="user_name"
                    placeholder="Username"
                    autoComplete="off"
                    {...register('user_name', {
                      required: 'This is required',
                      minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                  />
                  <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.custom_id}>
                  <FormLabel htmlFor="custom_id">Custom Patient ID</FormLabel>
                  <Input
                    id="custom_id"
                    placeholder="Custom Patient ID"
                    autoComplete="off"
                    {...register('custom_id')}
                  />
                  <FormErrorMessage>
                    {errors.custom_id && errors.custom_id.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.dob} isRequired>
                  <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                  <Input
                    id="dob"
                    placeholder="YYYY-MM-DD"
                    autoComplete="off"
                    as={InputMask}
                    mask="****-**-**"
                    // maskChar={null}
                    {...register('dob')}
                  ></Input>
                  <FormErrorMessage>{errors.dob && errors.dob.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.dominant_eye} isRequired>
                  <FormLabel htmlFor="dominant_eye">Dominant Eye</FormLabel>
                  <Select id="dominant_eye" placeholder="Select" {...register('dominant_eye')}>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.dominant_eye && errors.dominant_eye.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.gender}>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select id="gender" placeholder="Select" {...register('gender')}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Nonbinary</option>
                  </Select>
                </FormControl>

                <FormControl isInvalid={errors.gender}>
                  <FormLabel htmlFor="ethnicity">Ethnicity</FormLabel>
                  <Select id="ethnicity" placeholder="Select" {...register('ethnicity')}>
                    <option value="White">White</option>
                    <option value="Black or African American">Black or African American</option>
                    <option value="American Indian or Alaska Native">
                      American Indian or Alaska Native
                    </option>
                    <option value="Asian">Asian</option>
                    <option value="Native Hawaiian or Other Pacific Islander">
                      Native Hawaiian or Other Pacific Islander
                    </option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>

                <FormControl isInvalid={errors.notes}>
                  <FormLabel htmlFor="notes">Notes</FormLabel>
                  <Textarea
                    id="notes"
                    placeholder="Type notes here"
                    {...register('notes')}
                  ></Textarea>
                </FormControl>

                {/* <FormControl isInvalid={errors.notes}>
                  <FormLabel htmlFor="refractive_correction">Refractive Correction</FormLabel>

                  <Table size="xs" fontSize="sm">
                    <Thead>
                      <Tr>
                        <Th textTransform="none">Rx</Th>
                        <Th>SPH</Th>
                        <Th>CYL</Th>
                        <Th>AXIS</Th>
                        <Th>PRISM</Th>
                        <Th>BASE</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr h="14">
                        <Th>O.D.</Th>
                        <Td>
                          <NumberInput size="xs" variant="flushed">
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td>
                          <NumberInput size="xs" variant="flushed">
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td>
                          <NumberInput size="xs" variant="flushed">
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td>
                          <NumberInput step={0.5} size="xs" variant="flushed">
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td>
                          <Select size="xs" variant="flushed">
                            <option value="BI">BI</option>
                            <option value="BO">BO</option>
                          </Select>
                        </Td>
                      </Tr>
                      <Tr>
                        <Th>O.S.</Th>
                        <Td>
                          <NumberInput size="xs">
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td>
                          <NumberInput size="xs">
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td>
                          <NumberInput size="xs">
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td>
                          <NumberInput step={0.5} size="xs">
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td>
                          <Select size="sm">
                            <option value="BI">BI</option>
                            <option value="BO">BO</option>
                          </Select>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </FormControl> */}

                <FormControl>
                  <FormLabel>Diagnoses</FormLabel>
                  <Box display="flex" justifyContent="space-between">
                    <FormControl display="flex">
                      <FormLabel
                        fontSize={['1rem']}
                        htmlFor="has_amblyopia"
                        mb="0"
                        fontWeight="normal"
                      >
                        Amblyopia
                      </FormLabel>
                      <Switch id="has_amblyopia" size="md" {...register('has_amblyopia')} />
                    </FormControl>
                    <FormControl display="flex" justifyContent="flex-end">
                      <FormLabel
                        fontSize={['1rem']}
                        htmlFor="has_strabismus"
                        mb="0"
                        fontWeight="normal"
                      >
                        Strabismus
                      </FormLabel>
                      <Switch id="has_strabismus" size="md" {...register('has_strabismus')} />
                    </FormControl>
                  </Box>
                </FormControl>
              </SimpleGrid>
            </form>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button onClick={() => reset(newPatientDefaults)}>Clear</Button>
            <Box>
              <Button onClick={onClose} mr="3">
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                isLoading={isSubmitting}
                onClick={submitForm}
                type="submit"
              >
                Add Patient
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
