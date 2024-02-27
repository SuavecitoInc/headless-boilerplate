import React from 'react';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    handle: string;
  };
};

export default function Page({ params }: PageProps) {
  const { handle } = params;
  return (
    <main>
      <h1>Collections</h1>
      <h2>{handle}</h2>
    </main>
  );
}
