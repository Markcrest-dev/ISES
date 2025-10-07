import classNames from 'classnames';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
  ...props
}) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  const containerStyles = classNames(
    'mx-auto px-4 sm:px-6 lg:px-8',
    sizes[size],
    className
  );

  return (
    <div className={containerStyles} {...props}>
      {children}
    </div>
  );
};