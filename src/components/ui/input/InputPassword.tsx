import React, { useState } from 'react';
import Input, { type Props as InputProps } from './Input';
import { Eye, EyeOff } from 'lucide-react';
import Hover from '@/components/ui/animation/Hover';

type Props = Omit<InputProps, 'type'>;

export default function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false);

  const isTouched = props.value.length >= 1;

  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      endAdornment={
        isTouched && (
          <Hover>
            <button
              type='button'
              onClick={() => setVisible(v => !v)}
              className='cursor-pointer text-primary'
            >
              {visible ? <EyeOff /> : <Eye />}
            </button>
          </Hover>
        )
      }
    />
  );
}
