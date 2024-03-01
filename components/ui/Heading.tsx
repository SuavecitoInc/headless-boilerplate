import React from 'react';
import clsx from 'clsx';

type HeadingProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
};

const Heading: React.FC<HeadingProps> = ({
  type,
  children,
  className = '',
}) => {
  const Tag = type as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={clsx(
        'text-left text-[18px] font-bold uppercase md:text-[24px]',
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
