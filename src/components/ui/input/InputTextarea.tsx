import React from 'react';

import Textarea from '@/components/ui/input/textarea';

import { type Props as InputProps } from './Input';

type Props = Omit<InputProps, 'type'>;

export default function InputTextarea(props: Props) {
  // @ts-ignore
  return <Textarea {...props} />;
}
