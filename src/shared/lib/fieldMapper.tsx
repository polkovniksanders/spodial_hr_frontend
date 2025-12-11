import Checkbox from '@/components/ui/input/Checkbox';
import Input from '@/components/ui/input/Input';
import PasswordInput from '@/components/ui/input/InputPassword';
import InputTextarea from '@/components/ui/input/InputTextarea';

import type { ReactNode } from 'react';
import type {
  ControllerRenderProps,
  ControllerFieldState,
} from 'react-hook-form';

type FieldConfig = {
  label: string;
  type: string;
  labelExtra?: ReactNode;
};

type VariantProps = {
  field: ControllerRenderProps<any, string>;
  fieldState: ControllerFieldState;
  config: FieldConfig;
};
export const VARIANT_MAPPER = {
  checkbox: function CheckboxVariant({
    field,
    fieldState,
    config,
  }: VariantProps) {
    return (
      <Checkbox
        {...field}
        label={config.label}
        labelExtra={config.labelExtra}
        type={config.type}
        error={fieldState.error?.message}
      />
    );
  },
  input: function InputVariant({ field, fieldState, config }: VariantProps) {
    return (
      <Input
        {...field}
        label={config.label}
        type={config.type}
        error={fieldState.error?.message}
      />
    );
  },
  inputPassword: function InputVariant({
    field,
    fieldState,
    config,
  }: VariantProps) {
    return (
      <PasswordInput
        {...field}
        label={config.label}
        error={fieldState.error?.message}
      />
    );
  },
  inputTextarea: function InputVariant({
    field,
    fieldState,
    config,
  }: VariantProps) {
    return (
      <InputTextarea
        {...field}
        label={config.label}
        error={fieldState.error?.message}
      />
    );
  },
} as const;

export type VariantType =
  | 'input'
  | 'checkbox'
  | 'inputPassword'
  | 'inputTextarea';
