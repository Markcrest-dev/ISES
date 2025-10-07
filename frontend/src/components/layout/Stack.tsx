
import React from 'react';
import classNames from 'classnames';

interface StackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  divider?: boolean;
}

export const Stack: React.FC<StackProps> = ({
  children,
  className,
  spacing = 4,
  divider = false,
  ...props
}) => {
  const spacingMap = {
    1: 'space-y-1',
    2: 'space-y-2',
    3: 'space-y-3',
    4: 'space-y-4',
    6: 'space-y-6',
    8: 'space-y-8',
    12: 'space-y-12',
  };

  const stackStyles = classNames(
    'flex flex-col',
    spacingMap[spacing],
    {
      'divide-y divide-gray-200': divider,
    },
    className
  );

  return (
    <div className={stackStyles} {...props}>
      {children}
    </div>
  );
};