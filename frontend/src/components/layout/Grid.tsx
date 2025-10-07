import classNames from 'classnames';
import React from 'react';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 2 | 4 | 6 | 8 | 12;
}

export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = 3,
  gap = 6,
  ...props
}) => {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-12',
  };

  const gapsMap = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
  };

  const gridStyles = classNames(
    'grid',
    colsMap[cols],
    gapsMap[gap],
    className
  );

  return (
    <div className={gridStyles} {...props}>
      {children}
    </div>
  );
};