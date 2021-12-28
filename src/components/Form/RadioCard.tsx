import {
  //   IconButton,
  Button,
  ButtonGroup,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  useId,
} from '@chakra-ui/react';
import React, { ReactElement, FC } from 'react';

// export type TransformControlsMode = 'translate' | 'rotate' | 'scale';

interface RadioCardProps extends UseRadioProps {
  id?: string;
  label: string;
  icon?: ReactElement<any>;
  size?: string;
}

const RadioCard: FC<RadioCardProps> = (props) => {
  const id = useId(props.id, `radioCard`);
  const { getInputProps, getCheckboxProps } = useRadio({ id, ...props });

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <>
      <Button
        aria-label={props.label}
        size={props.size}
        // icon={props.icon}
        as="label"
        htmlFor={input.id}
        {...checkbox}
        _checked={{
          fontWeight: 'semibold',
          color: 'white',
          bg: 'blue.400',
          borderColor: 'blue.400',
          //   borderColor: 'blue.600',
        }}
        // fontWeight="normal"
        color="gray.500"
        borderColor="gray.200"
        borderWidth="2px"
        variant="outline"
        cursor="pointer"
        className="flex-grow"
      >
        {props.label}
      </Button>
      <input {...input} />
    </>
  );
};

type Option = {
  label: string;
  value: string | number;
};

export type RadioCardSelectProps = {
  id?: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: string;
  colorScheme?: string;
};

export const RadioCardSelect: FC<RadioCardSelectProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  className,
  size,
  colorScheme,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    value,
    onChange,
  });

  const group = getRootProps();

  return (
    <ButtonGroup id={id} className={className} {...group} colorScheme={colorScheme}>
      {options.map((o) => {
        return (
          <RadioCard
            key={o.value}
            label={o.label}
            size={size}
            {...getRadioProps({ value: o.value })}
          />
        );
      })}
      {/* <RadioCard {...getRadioProps({ value: 'translate' })} label="Translate" />
      <RadioCard {...getRadioProps({ value: 'rotate' })} label="Rotate" />
      <RadioCard {...getRadioProps({ value: 'scale' })} label="Scale" /> */}
    </ButtonGroup>
  );
};

// export default RadioCardSelect;
