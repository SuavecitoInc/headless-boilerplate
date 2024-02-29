import React from 'react';
import { InfiniteGrid } from '@/components/collection';
import { Collection as CollectionType } from '@/types/storefront';

type Props = {
  data: CollectionType;
};

const Collection: React.FC<Props> = ({ data }) => {
  const { title } = data;
  return (
    <div>
      <h1 className="mb-2.5">{title}</h1>
      <InfiniteGrid data={data} />
    </div>
  );
};

export default Collection;
