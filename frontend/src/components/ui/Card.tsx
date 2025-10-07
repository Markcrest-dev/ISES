import classNames from 'classnames';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  hover = false,
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const cardStyles = classNames(
    'bg-white rounded-lg shadow-sm',
    paddings[padding],
    {
      'transition-shadow duration-200 hover:shadow-md': hover,
    },
    className
  );

  return (
    <div className={cardStyles} {...props}>
      {children}
    </div>
  );
};