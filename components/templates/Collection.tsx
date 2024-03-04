import React from 'react';
import { InfiniteGrid } from '@/components/collection';
import { Collection as CollectionType } from '@/types/storefront';
import { Heading } from '@/components/ui';

type Props = {
  data: CollectionType;
};

const Collection: React.FC<Props> = ({ data }) => {
  const { title } = data;
  return (
    <div>
      <Heading type="h1" className="mb-2.5 md:mb-4">
        {title}
      </Heading>
      <InfiniteGrid data={data} />
    </div>
  );
};

export default Collection;
