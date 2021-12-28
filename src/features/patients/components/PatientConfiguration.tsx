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

import { RadioCardSelect } from '../../../components/Form/RadioCard';
import { useVVPLayouts } from '../api/getLayouts';
import { useTestConfig } from '../api/getTestConfig';
import { Patient } from '../types';
import { VVPTestConfig } from '../types/vvp';
// import { Patient } from '../types';

export const PatientConfiguration = () => {
  const defaultTestConfig: VVPTestConfig = {
    AudioMode: 'On',
    ControlMode: 'Hand',
    FixationAssist: true,
    Layout: '24-2-S',
    LayoutType: 'Screen',
    TestDurationLimitSec: 3600,
    TestEyes: 'Right',
    TutorialEnabled: true,
  };
  const [config, setConfig] = useState(defaultTestConfig);
  const { selectedPatientId, setSelectedPatientId } = usePatientStore();

  const { data: layoutsData, isLoading: layoutsLoading } = useVVPLayouts({});

  const { data: fetchedData, isLoading: fetchedDataLoading } = useTestConfig({
    clinic_user_id: selectedPatientId,
  });

  const [selectedLayoutType, setSelectedLayoutType] = useState('');
  const [selectedLayout, setSelectedLayout] = useState('');
  const [timeValue, setTimeValue] = useState(1800);

  const [filterString, setFilterString] = useState<string>('');
  const [radioVal, setRadioVal] = useState<string>('translate');

  const [saveButtonDisabledState, setSaveButtonDisabledState] = useState<boolean>(true);
  const [revertButtonDisabledState, setRevertButtonDisabledState] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  useEffect(() => {
    if (fetchedData?.test_config) {
      setConfig({ ...fetchedData.test_config });
    }
  }, [fetchedData]);

  useEffect(() => {
    if (!_.isEqual(config, fetchedData?.test_config)) {
      setSaveButtonDisabledState(false);
      setRevertButtonDisabledState(false);
    } else {
      setSaveButtonDisabledState(true);
      setRevertButtonDisabledState(true);
    }
  }, [config, fetchedData?.test_config]);

  if (fetchedDataLoading || layoutsLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!fetchedData || !layoutsData) return null;

  // console.log(layoutsData);
  // console.log(data);

  const LayoutTypeOptions = () => {
    return (
      <>
        {layoutsData.types.map((t) => {
          return (
            <option key={t} value={t}>
              {t}
            </option>
          );
        })}
      </>
    );
  };

  const LayoutOptions = () => {
    if (config.LayoutType) {
      return (
        <>
          {layoutsData.layouts
            .filter((l) => l.type == config.LayoutType)
            .map((t) => {
              return (
                <option key={t.vvp_layout_id} value={t.name}>
                  {t.name}
                </option>
              );
            })}
        </>
      );
    } else {
      return <></>;
    }
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
        <VStack className="space-y-1">
          <FormControl>
            <FormLabel htmlFor="Tutorial">Tutorial</FormLabel>
            <RadioCardSelect
              id="Tutorial"
              name="Tutorial"
              options={[
                { label: 'Give Tutorial', value: 'true' },
                { label: 'Skip Tutorial', value: 'false' },
              ]}
              value={config.TutorialEnabled.toString()}
              onChange={(v) => setConfig({ ...config, TutorialEnabled: JSON.parse(v) })}
              className="w-full"
              size={formSize}
            ></RadioCardSelect>
          </FormControl>
          <FormControl size={formSize} pt="4">
            <FormLabel htmlFor="LayoutType">Layout Type</FormLabel>
            <Select
              id="LayoutType"
              name="LayoutType"
              placeholder="Select Layout Type"
              value={config.LayoutType}
              onChange={(e) => setConfig({ ...config, LayoutType: e.target.value })}
              size={formSize}
            >
              <LayoutTypeOptions />
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="Layout">Layout</FormLabel>
            <Select
              id="Layout"
              name="Layout"
              placeholder="Select Layout"
              value={config.Layout}
              onChange={(e) => setConfig({ ...config, Layout: e.target.value })}
              size={formSize}
            >
              <LayoutOptions />
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="Laterality">Laterality</FormLabel>
            <RadioCardSelect
              id="ControlMode"
              name="ControlMode"
              options={[
                { label: 'Test Both Eyes', value: 'Both' },
                { label: 'Left Only', value: 'Left' },
                { label: 'Right Only', value: 'Right' },
              ]}
              value={config.TestEyes}
              onChange={(v) => setConfig({ ...config, TestEyes: v })}
              className="w-full"
              size={formSize}
            ></RadioCardSelect>
          </FormControl>
          <FormControl pt="4">
            <FormLabel htmlFor="TestDurationLimitSec">Test Timeout</FormLabel>
            <Slider
              id="TestDurationLimitSec"
              name="TestDurationLimitSec"
              max={60}
              min={0}
              step={0.5}
              onChange={(val) => {
                if (val < 10) val = 10;
                setConfig({ ...config, TestDurationLimitSec: parseTime(val.toString()) * 60.0 });
              }}
              value={parseFloat(formatTime(config.TestDurationLimitSec))}
              size={formSize}
              rounded="lg"
            >
              <SliderMark
                value={parseFloat(formatTime(config.TestDurationLimitSec))}
                textAlign="right"
                color="white"
                fontWeight="semibold"
                mt="-3"
                zIndex={100}
                ml="-5rem"
              >
                {config.TestDurationLimitSec / 60.0} min
              </SliderMark>
              <SliderTrack h="10" rounded="md" size="lg">
                <SliderFilledTrack bgColor="blue.400" />
              </SliderTrack>
              {/* <SliderThumb h="8" /> */}
            </Slider>
          </FormControl>

          {/* <FormControl>
            <FormLabel htmlFor="ControlMode">Control Mode</FormLabel>
            <Select
              id="ControlMode"
              name="ControlMode"
              value={config.ControlMode}
              onChange={(e) => setConfig({ ...config, ControlMode: e.target.value })}
              size={formSize}
            >
              <option value="Head">Head</option>
              <option value="Hand">Hand</option>
            </Select>
          </FormControl> */}
          <Flex
            width="full"
            className="flex flex-col space-y-1 lg:flex-row lg:space-x-8 lg:space-y-0"
            pt="4"
          >
            <FormControl flex="1">
              <FormLabel htmlFor="Control Mode">Control Mode</FormLabel>
              <RadioCardSelect
                id="ControlMode"
                name="ControlMode"
                options={[
                  { label: 'Hand Control', value: 'Hand' },
                  { label: 'Head Control', value: 'Head' },
                ]}
                value={config.ControlMode}
                onChange={(v) => setConfig({ ...config, ControlMode: v })}
                className="w-full"
                size={formSize}
              ></RadioCardSelect>
            </FormControl>
            <FormControl flex="1">
              <FormLabel htmlFor="FixationAssist">Fixation Assist</FormLabel>
              <RadioCardSelect
                id="FixationAssist"
                name="FixationAssist"
                options={[
                  { label: 'Fixation Assist On', value: 'true' },
                  { label: 'Fixation Assist Off', value: 'false' },
                ]}
                value={config.FixationAssist.toString()}
                onChange={(v) => setConfig({ ...config, FixationAssist: JSON.parse(v) })}
                className="w-full"
                size={formSize}
              ></RadioCardSelect>
            </FormControl>
          </Flex>
          <Flex width="full" className="flex flex-row" pt="10">
            <Button
              className="w-full"
              onClick={() => setConfig(fetchedData.test_config)}
              disabled={revertButtonDisabledState}
            >
              Revert Changes
            </Button>
            <Spacer />
            <Button type="submit" className="w-full" disabled={saveButtonDisabledState}>
              Save Changes
            </Button>
          </Flex>
        </VStack>
      </form>
    </>
  );
};
