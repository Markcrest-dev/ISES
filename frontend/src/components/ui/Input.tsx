import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  helper,
  id,
  ...props
}) => {
  const inputStyles = classNames(
    'block w-full rounded-md shadow-sm transition duration-150',
    'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    {
      'border-gray-300': !error,
      'border-red-500 focus:ring-red-500 focus:border-red-500': error,
    },
    className
  );

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={inputStyles}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500" id={`${id}-helper`}>
          {helper}
        </p>
      )}
    </div>
  );
};