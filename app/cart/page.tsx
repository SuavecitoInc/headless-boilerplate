import React from 'react';
import { Cart as CartTemplate } from '@/components/templates';
import { getCart } from './actions';

export const dynamic = 'force-dynamic';

export const generateMetadata = () => ({
  title: `Cart`,
});

export default async function Page() {
  const cart = await getCart();

  return (
    <main>
      <CartTemplate cart={cart} />
    </main>
  );
}
