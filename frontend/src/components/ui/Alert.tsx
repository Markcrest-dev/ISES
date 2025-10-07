import classNames from 'classnames';
import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
  title?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  type = 'info',
  className,
  title,
  ...props
}) => {
  const types = {
    info: 'bg-primary-50 text-primary-800 border-primary-200',
    success: 'bg-success-50 text-success-700 border-success-200',
    warning: 'bg-warning-50 text-warning-700 border-warning-200',
    error: 'bg-error-50 text-error-700 border-error-200',
  };

  const alertStyles = classNames(
    'rounded-lg border p-4',
    types[type],
    className
  );

  return (
    <div className={alertStyles} role="alert" {...props}>
      {title && (
        <h3 className="font-medium mb-1">{title}</h3>
      )}
      <div className="text-sm">
        {children}
      </div>
    </div>
  );
};