'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { IconClose, Divider, Button } from '@/components/ui';
import type { CartLine } from '@/types/storefront';

type LastItemAddedProps = {
  lineItem: CartLine;
};
const LastItemAdded: React.FC<LastItemAddedProps> = ({ lineItem }) => {
  const { merchandise } = lineItem;

  return (
    <div className="flex gap-3">
      <div className="w-[35%]">
        <div className="relative aspect-product h-full w-full">
          {merchandise.image && (
            <Image
              fill
              className="h-auto w-auto object-contain"
              sizes="(max-width: 768px) 300px, 40vw"
              src={merchandise.image.url}
              alt={merchandise.image.altText || 'Product Image'}
            />
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-col">
            <span className="text-md font-bold leading-normal text-primary md:text-lg">
              {merchandise.product.title}
            </span>
            <div className="mb-[10px] flex flex-col gap-[1px] text-sm leading-tight md:text-base">
              {merchandise.selectedOptions
                .filter(
                  (option) =>
                    option.name !== 'Title' && option.value !== 'Default Title'
                )
                .map((option) => (
                  <div key={option.name}>
                    <span>
                      {option.name}: {option.value}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <span className="text-sm">Qty: {lineItem.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
type CartToastProps = {
  addedProduct: CartLine | null;
  setAddedProduct: (product: CartLine | null) => void;
};
const CartToast: React.FC<CartToastProps> = ({
  addedProduct,
  setAddedProduct,
}) => {
  const toastRef = useRef<any>(null);
  const router = useRouter();
  const closeToast = useCallback(
    () => setAddedProduct(null),
    [setAddedProduct]
  );

  const handleNavigate = (route: string) => {
    closeToast();
    router.push(route);
  };

  useEffect(() => {
    if (!addedProduct) return;
    const intevalAmount = 2500;
    const timer = setInterval(() => {
      closeToast();
    }, intevalAmount);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(timer);
  }, [addedProduct, closeToast]);

  return (
    <AnimatePresence>
      {addedProduct && (
        <motion.div
          key="cart-toast"
          ref={toastRef}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: 'spring', stiffness: 180, damping: 26 }}
          className="fixed right-0 top-0 z-50 mx-auto w-full border border-suaveGrey bg-white px-3 py-3 shadow-lg md:max-w-[420px]"
        >
          <div className="flex h-full w-full justify-between">
            <span className="mr-10 font-bold uppercase">
              Just added to cart
            </span>
            <Button
              isUnstyled
              className="hover:opacity-hover"
              onClick={closeToast}
            >
              <IconClose />
            </Button>
          </div>
          <Divider className="my-3" />
          <div className="flex flex-col justify-between">
            <LastItemAdded lineItem={addedProduct} />
            <Divider className="mb-5 mt-3" />
            <div className="flex flex-col items-center gap-[10px]">
              <div className="flex">
                <Button
                  onClick={() => handleNavigate('/cart')}
                  className="px-9"
                >
                  <span className="uppercase">View Cart </span>
                  {/* <span className="ml-2">({totalQuantity})</span> */}
                </Button>
              </div>
              <Button
                isUnstyled
                onClick={() => handleNavigate('/collections')}
                className="text-primary underline hover:opacity-hover"
              >
                <span>Continue Shopping</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartToast;
