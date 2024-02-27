import React from 'react';
import Image from 'next/image';
import emptyImage from '@/public/placeholder.jpg';

const Placeholder: React.FC = () => (
  <Image
    fill
    src={emptyImage}
    alt="placeholder image"
    className="h-auto w-auto border-4 border-slate-300 object-contain opacity-20"
    sizes="(max-width: 768px) 180px, 120px"
  />
);

export default Placeholder;
