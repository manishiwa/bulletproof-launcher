/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormLabel,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
  Stack,
  Switch,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useBreakpointValue,
  SimpleGrid,
  FormErrorMessage,
} from '@chakra-ui/react';
import { SaveAsIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/solid';
import _, { filter } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { FixedSizeList as List } from 'react-window';

import { Spinner } from '@/components/Elements';
import { PatientListCard } from '@/components/Elements/PatientListCard/PatientListCard';
import { SelectField } from '@/components/Form/SelectField';
import { usePatientStore } from '@/stores/patients';

import { RadioCardSelect } from '../../../../components/Form/RadioCard';
import { useVVPLayouts } from '../../api/getLayouts';
import { useSmartAssistConfig } from '../../api/getSmartAssistConfig';
import { useSmartAssistEvents } from '../../api/getSmartAssistEvents';
import { useSmartAssistSettings } from '../../api/getSmartAssistSettings';
import { useSetSmartAssistSettings } from '../../api/setSmartAssistSettings';
import { Patient } from '../../types';
import { SmartAssistSettings } from '../../types/smartAssist';

import { SmartAssistEventsTable } from './SmartAssistEventsTable';
// import { Patient } from '../types';

export const SmartAssistConfiguration = () => {
  const defaultSettings: SmartAssistSettings = {
    sa_branch_name: 'Simple',
    sa_tracks_enabled: [],
  };

  const [settings, setSettings] = useState<SmartAssistSettings>(defaultSettings);
  console.log('settings', settings);

  const { selectedPatientId, setSelectedPatientId } = usePatientStore();

  const { data: saConfigData, isLoading: saConfigLoading } = useSmartAssistConfig({});
  const { data: saEventsData, isLoading: saEventsLoading } = useSmartAssistEvents({
    clinic_user_id: selectedPatientId,
  });

  console.log('saEventsData', saEventsData);

  const { data: fetchedSettings, isLoading: fetchedSettingsLoading } = useSmartAssistSettings({
    clinic_user_id: selectedPatientId,
  });
  console.log('fetchedSettings', fetchedSettings);

  const [timeValue, setTimeValue] = useState(1800);

  const [filterString, setFilterString] = useState<string>('');
  const [radioVal, setRadioVal] = useState<string>('translate');

  const [saveButtonDisabledState, setSaveButtonDisabledState] = useState<boolean>(true);
  const [revertButtonDisabledState, setRevertButtonDisabledState] = useState<boolean>(true);

  const setSmartAssistSettingsMutation = useSetSmartAssistSettings();

  const switchSize = useBreakpointValue({ base: 'md', lg: 'lg' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(settings);
    setSmartAssistSettingsMutation.mutate({
      clinic_user_id: selectedPatientId,
      sa_settings: settings,
    });
    // console.log(data);
  };

  const [switches, setSwitches] = useState({
    AntiSuppression: false,
    Stereo: false,
    Vergence: false,
  });

  const updateButtons = () => {};

  useEffect(() => {
    if (fetchedSettings?.sa_settings) {
      setSettings({ ...fetchedSettings.sa_settings });
    } else {
      setSettings(defaultSettings);
    }
  }, [fetchedSettings]);

  useEffect(() => {
    if (!_.isEqual(settings, fetchedSettings?.sa_settings)) {
      setSaveButtonDisabledState(false);
      setRevertButtonDisabledState(false);
    } else {
      setSaveButtonDisabledState(true);
      setRevertButtonDisabledState(true);
    }
  }, [settings, fetchedSettings?.sa_settings]);

  if (fetchedSettingsLoading || saConfigLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const backgroundColors: any = {
    AntiSuppression: 'yellow.600',
    Stereo: 'blue.600',
    Vergence: 'green.600',
  };

  const backgroundColorsDisabled: any = {
    AntiSuppression: 'gray.400',
    Stereo: 'gray.400',
    Vergence: 'gray.400',
  };

  const switchColorSchemes: any = {
    AntiSuppression: 'yellow',
    Stereo: 'blue',
    Vergence: 'green',
  };

  const formatTime = (val: number) => {
    return val / 60.0 + ' min';
  };
  const parseTime = (val: string) => {
    return parseFloat(val);
  };
  const formSize = 'md';

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack className="flex space-y-2">
          <Box>
            <Heading>Cover Test</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid columns={6} spacingX={10} spacingY={5}>
                <FormControl isInvalid={errors.custom_id}>
                  <FormLabel htmlFor="magnitude">Magnitude (Δ)</FormLabel>
                  <NumberInput id="magnitude" step={0.1}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>
                    {errors.custom_id && errors.custom_id.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.dominant_eye} isRequired>
                  <FormLabel htmlFor="dominant_eye">Eye</FormLabel>
                  <Select id="dominant_eye" placeholder="Select" {...register('dominant_eye')}>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.dominant_eye && errors.dominant_eye.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.distance} isRequired>
                  <FormLabel htmlFor="distance">Distance</FormLabel>
                  <Select id="distance" placeholder="Select" {...register('dominant_eye')}>
                    <option value="Near">Near</option>
                    <option value="Distance">Distance</option>
                  </Select>
                  <FormErrorMessage>{errors.distance && errors.distance.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.distance} isRequired>
                  <FormLabel htmlFor="distance">Direction</FormLabel>
                  <Select id="distance" placeholder="Select" {...register('dominant_eye')}>
                    <option value="Near">Near</option>
                    <option value="Distance">Distance</option>
                  </Select>
                  <FormErrorMessage>{errors.distance && errors.distance.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.gender}>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select id="gender" placeholder="Select" {...register('gender')}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Nonbinary</option>
                  </Select>
                </FormControl>

                {/*
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
                */}
              </SimpleGrid>
            </form>
          </Box>
          {saConfigData
            ?.map((r) => r.track_name)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((trackName) => {
              return (
                <Box
                  key={trackName}
                  rounded="lg"
                  background={
                    settings?.sa_tracks_enabled?.includes(trackName)
                      ? backgroundColors[trackName.replace('-', '')]
                      : backgroundColorsDisabled[trackName.replace('-', '')]
                  }
                  w="full"
                  p="4"
                >
                  <VStack align="left" w="full">
                    <HStack mb="2">
                      <Switch
                        colorScheme={switchColorSchemes[trackName.replace('-', '')]}
                        size={switchSize}
                        mr="5"
                        mt="1"
                        isChecked={settings?.sa_tracks_enabled?.includes(trackName)}
                        onChange={(e) => {
                          // console.log(trackName.replace('-', ''), e.target.value);
                          // setSwitches({
                          //   ...switches,
                          //   [trackName.replace('-', '')]: e.target.checked ? true : false,
                          // });
                          // console.log(switches);
                          console.log('pre settings', settings);
                          if (e.target.checked) {
                            setSettings((prevSettings) => ({
                              ...prevSettings,
                              sa_tracks_enabled: settings?.sa_tracks_enabled
                                ?.filter((t) => t !== trackName)
                                .concat([trackName]),
                            }));
                          } else {
                            setSettings({
                              ...settings,
                              sa_tracks_enabled: settings?.sa_tracks_enabled?.filter(
                                (t) => t !== trackName
                              ),
                            });
                          }
                          console.log('post settings', settings);
                        }}
                      />
                      <Heading color="white" fontSize={['md', 'lg', 'xl', '3xl']} fontWeight="bold">
                        {trackName}
                      </Heading>
                    </HStack>

                    <Accordion allowToggle={true}>
                      {/* <AccordionItem background="white" rounded="lg">
                        <Flex>
                          <AccordionButton flexGrow="1" px="3" py="2">
                            <AccordionIcon mr="2" />
                            <Box textAlign="left" fontWeight="bold" fontSize="lg" mr="auto">
                              <h2>Configuration</h2>
                            </Box>
                            <Text fontWeight="medium" ml="0">
                              Next Stage this patient will play
                            </Text>
                          </AccordionButton>
                          <Flex px="3" py="2" pl="0">
                            <Select
                              fontWeight="medium"
                              fontSize="md"
                              size="sm"
                              display="inline-block"
                              minW="130"
                            >
                              {_.uniqBy(
                                saConfigData?.filter((row) => row.track_name == trackName),
                                'stage_name'
                              ).map((row) => {
                                return (
                                  <option key={row.stage_name} dir="rtl" value={row.stage_name}>
                                    {'Stage ' + row.stage_name}
                                  </option>
                                );
                              })}
                            </Select>
                          </Flex>
                        </Flex>
                        <AccordionPanel pb={4}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat.
                        </AccordionPanel>
                      </AccordionItem> */}

                      <AccordionItem background="white" rounded="lg">
                        <h2>
                          <AccordionButton>
                            <AccordionIcon mr="2" />
                            <Box
                              flex="1"
                              textAlign="left"
                              fontWeight="bold"
                              fontSize={['sm', 'md', 'lg']}
                            >
                              History
                            </Box>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {saEventsData && (
                            <SmartAssistEventsTable input={saEventsData}></SmartAssistEventsTable>
                          )}
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </VStack>
                </Box>
              );
            })}
          <Flex width="full" className="flex flex-row" pt="10">
            <Button
              className="w-full"
              onClick={() => {
                if (fetchedSettings?.sa_settings) setSettings(fetchedSettings.sa_settings);
              }}
              disabled={revertButtonDisabledState}
            >
              Revert Changes
            </Button>
            <Spacer />
            <Button
              isLoading={setSmartAssistSettingsMutation.isLoading}
              type="submit"
              className="w-full"
              disabled={saveButtonDisabledState}
            >
              Save Changes
            </Button>
          </Flex>
        </VStack>
      </form>
    </>
  );
};
