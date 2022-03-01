import { Input, FormControl } from '@chakra-ui/react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  w?: string;
  size?: string;
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', size = 'md', label, className, registration, error, w = 'full' } = props;
  return (
    <FieldWrapper label={label} error={error} className="w-full mt-2" size={size}>
      <Input type={type} w={w} size={size} className={clsx('', className)} {...registration} />
    </FieldWrapper>
  );
};
