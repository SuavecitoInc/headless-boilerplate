import React from 'react';
import { title as siteTitle } from '@/data/shop';
import { Search as SearchTemplate } from '@/components';

export const dynamic = 'force-dynamic';

export const generateMetadata = () => ({
  title: `Search | ${siteTitle}`,
});

type Props = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default function Page({ searchParams }: Props) {
  const { q } = searchParams;
  const initialQuery = q ? String(q) : '';
  return (
    <main>
      <SearchTemplate query={initialQuery} />
    </main>
  );
}
