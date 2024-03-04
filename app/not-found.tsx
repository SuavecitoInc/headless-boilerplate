import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components';
import Caravaggio from '@/public/404.png';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[700px]">
      <div className="mt-4 flex w-full flex-col justify-center md:flex-row md:items-start lg:mt-8 lg:justify-between">
        <div className="flex flex-col items-center justify-center gap-1.5 text-center font-bold uppercase text-black">
          <h1 className="text-[100px] leading-[90px] md:text-[200px] md:leading-none">
            404
          </h1>
          <h2 className="text-3xl leading-none">Page Not Found</h2>
          <p className="text-xl leading-none">
            Sorry, nothing here. Just a cat.
          </p>
          <Link href="/" className="mt-4">
            <Button>Return Home</Button>
          </Link>
        </div>
        <div className="mx-auto mt-5 md:m-0">
          <div className="relative aspect-[9/16] min-h-[410px] md:min-h-[520px]">
            <Image
              src={Caravaggio}
              fill
              className="object-contain w-auto h-auto"
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
              alt="Rachel's cute cat"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
