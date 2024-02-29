import React from 'react';

type HeadingProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
};

const Heading: React.FC<HeadingProps> = ({ type, children }) => {
  const Tag = type as keyof JSX.IntrinsicElements;
  return (
    <Tag className="text-left text-[18px] font-bold uppercase md:text-[24px]">
      {children}
    </Tag>
  );
};

export default Heading;
