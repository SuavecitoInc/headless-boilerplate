// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { redirect } from 'next/navigation';
import { handleDiscount } from '@/app/cart/actions';

type PageProps = {
  params: {
    code: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { code } = params;
  await handleDiscount(code);
  redirect('/');
}
