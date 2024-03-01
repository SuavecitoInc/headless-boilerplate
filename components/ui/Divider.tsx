import React from 'react';
import clsx from 'clsx';

type DividerProps = {
  className?: string;
};
const Divider: React.FC<DividerProps> = ({ className = '' }) => (
  <div>
    <hr className={clsx('border-body', className)} />
  </div>
);

export default Divider;
