'use client';

import clsx from 'clsx';
import { ChevronDown, X, Check } from 'lucide-react';
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface InputDropdownProps {
  options: DropdownOption[];
  value?: string | string[]; // одиночный или множественный выбор
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  multiple?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
  error?: boolean;
  helperText?: string;
}

const InputDropdown = forwardRef<
  {
    focus: () => void;
    clear: () => void;
  },
  InputDropdownProps
>((props, ref) => {
  const {
    options = [],
    value,
    onChange,
    placeholder = 'select',
    label,
    multiple = false,
    disabled = false,
    searchable = true,
    clearable = true,
    className,
    error = false,
    helperText,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Controlled значение
  const selectedValues = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value
      ? [value]
      : [];

  const selectedLabels = selectedValues
    .map(val => options.find(opt => opt.value === val)?.label)
    .filter(Boolean);

  const displayedLabel = multiple
    ? selectedLabels.length > 0
      ? `${selectedLabels.length} selected`
      : placeholder
    : selectedLabels[0] || placeholder;

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectOption = (option: DropdownOption) => {
    if (option.disabled) return;

    let newValue: string | string[];

    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const exists = current.includes(option.value);
      newValue = exists
        ? current.filter(v => v !== option.value)
        : [...current, option.value];
    } else {
      newValue = option.value;
      setIsOpen(false);
      setSearchQuery('');
    }

    onChange?.(newValue);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : '');
    setSearchQuery('');
  };

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setHighlightedIndex(prev =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (highlightedIndex >= 0) {
            selectOption(filteredOptions[highlightedIndex]);
          }
          break;
        }
        case 'Escape': {
          setIsOpen(false);
          setSearchQuery('');
          triggerRef.current?.focus();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useImperativeHandle(ref, () => ({
    focus: () => triggerRef.current?.focus(),
    clear: () => onChange?.(multiple ? [] : ''),
  }));

  return (
    <div className={clsx('relative w-[240px] h-[32px]', className)}>
      {label && (
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          {label}
        </label>
      )}

      <div
        ref={triggerRef}
        tabIndex={disabled ? undefined : 0}
        onClick={toggleOpen}
        onKeyDown={e =>
          e.key === 'Enter' || e.key === ' ' ? toggleOpen() : null
        }
        className={clsx(
          'w-full h-full px-4.5 rounded-full flex items-center justify-between  border transition-all',
          'focus-within:border-primary focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-[#4FB268]',
          error
            ? 'border-red-500'
            : isOpen
              ? 'border-[#4FB268] ring-2 ring-[#4FB268]'
              : 'border-gray-300 hover:border-gray-400',
          disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
          'cursor-pointer',
        )}
      >
        <div className='flex-1 flex flex-wrap items-center gap-2 min-h-[1.25rem]'>
          {multiple && selectedLabels.length > 0 ? (
            selectedLabels.map(label => (
              <span
                key={label}
                className='inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'
              >
                {label}
                {/*<button
                  onClick={e => {
                    e.stopPropagation();
                    const option = options.find(o => o.label === label);
                    if (option) selectOption(option);
                  }}
                  className='hover:bg-blue-200 rounded-full p-0.5'
                >
                  <X className='w-3 h-3' />
                </button>*/}
              </span>
            ))
          ) : (
            <span
              className={clsx(
                'text-sm truncate',
                selectedLabels.length === 0 && 'text-gray-500',
              )}
            >
              {displayedLabel}
            </span>
          )}
        </div>

        <div className='flex items-center gap-2 ml-2'>
          {/* {clearable && selectedValues.length > 0 && !disabled && (
            <button
              onClick={clearSelection}
              className='p-1 hover:bg-gray-200 rounded-full transition'
            >
              <X className='w-4 h-4 text-gray-500' />
            </button>
          )}*/}
          <ChevronDown
            className={clsx(
              'w-5 h-5 text-gray-500 transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className='absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-auto'
        >
          {searchable && (
            <div className='p-2  border-b border-gray-200 sticky top-0 bg-white'>
              <input
                ref={inputRef}
                type='text'
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(-1);
                }}
                placeholder='Search'
                className='w-full px-2 h-[32px] text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4FB268]'
                onClick={e => e.stopPropagation()}
              />
            </div>
          )}

          <ul className='py-1'>
            {filteredOptions.length === 0 ? (
              <li className='px-4 py-3 text-sm text-gray-500'>
                Ничего не найдено
              </li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    key={option.value}
                    onClick={() => selectOption(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={clsx(
                      'px-4 py-3 flex items-center justify-between cursor-pointer transition-colors text-sm',
                      isHighlighted && 'bg-blue-50',
                      isSelected && 'bg-blue-100 font-medium',
                      option.disabled && 'opacity-50 cursor-not-allowed',
                    )}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className='w-4 h-4 text-blue-600' />}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {helperText && (
        <p
          className={clsx(
            'mt-1 text-xs',
            error ? 'text-red-600' : 'text-gray-500',
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

InputDropdown.displayName = 'InputDropdown';

export default InputDropdown;
