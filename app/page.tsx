'use client';

import Link from 'next/link';
import Image from 'next/image';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { Button } from '@/components/ui/button';
import Subtitle from '@/components/atoms/Subtitle';

export default function Home() {
  const verificationEntry = [
    {
      title: 'Try BVN Verification  →',
      body: 'Confirm your identity using BVN to prevent fraud and unauthorized access.',
    },
    {
      title: 'Try Document Verification  →',
      body: 'Upload and scan your official ID to confirm your identity.',
    },
  ];
  return (
    <>
      {/* Header */}
      <header>
        <figure className="p-[1px] border-4 border-stone-900 mb-2 mt-6 h-28 w-28 mx-auto rounded-full flex justify-items-center items-center">
          <Image
            aria-hidden
            src="/images/profile.jpg"
            alt="Profile photo"
            width={160}
            height={160}
            className="rounded-full h-full"
          />
        </figure>
        <Title center>Hello Kingslee</Title>
        <Body center>
          You’ve been selected to test the first Anti-Money Laundering product
          from Southeast Nigeria.
        </Body>
        <Body center className="mt-4">
          0/5 Trials left
        </Body>

        <Link href="/applications">
          <Button className="rounded-full mt-1 flex mx-auto">
            View Applications
          </Button>
        </Link>
      </header>

      {/* Body */}
      <main className="flex flex-col gap-[2px] mt-6">
        {verificationEntry?.map((item: any, index) => (
          <Link
            key={item?.title + index}
            href="/secure/prestart"
            className={`flex items-center justify-items-center gap-2 bg-stone-100 hover:bg-stone-200 px-4 ${
              index === 0
                ? 'rounded-t-2xl'
                : index === verificationEntry.length - 1
                ? 'rounded-b-2xl'
                : ''
            }`}
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={48}
              height={48}
              className="mx-auto mt-6 mb-4"
            />
            <div className="w-full">
              <Subtitle className="text-base">{item?.title}</Subtitle>
              <Body className="text-xs">{item?.body}</Body>
            </div>
          </Link>
        ))}
      </main>

      {/* Footer */}
      <footer>
        <Body center className="text-xs mt-2">
          <>
            Powered by <span className="text-stone-400">IKaad</span>
          </>
        </Body>
      </footer>
    </>
  );
}
