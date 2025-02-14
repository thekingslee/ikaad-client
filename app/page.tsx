'use client';

import Link from 'next/link';
import Image from 'next/image';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { Button } from '@/components/ui/button';
import Subtitle from '@/components/atoms/Subtitle';
import { useRouter } from 'next/navigation';
import useStore, { VericationStageTypes } from '@/store/store';
import { useEffect, useRef } from 'react';

type verificationEntry = {
  title: string;
  body: string;
  verification_stages: VericationStageTypes[];
};

export default function Home() {
  const router = useRouter();
  const { stageData, setVerificationStages, updateCurrentStage } = useStore();
  const routeRef = useRef<string | null>(null);

  const verificationEntry: verificationEntry[] = [
    {
      title: 'Try BVN Verification  →',
      body: 'Confirm your identity using BVN to prevent fraud and unauthorized access.',
      verification_stages: ['START', 'LIVELINESS_TEST', 'BVN'],
    },
    {
      title: 'Try Document Verification  →',
      body: 'Upload and scan your official ID to confirm your identity.',
      verification_stages: ['START', 'LIVELINESS_TEST', 'DOCUMENT_CAPTURE'],
    },
  ];

  const handleVerification = (item: verificationEntry) => {
    setVerificationStages(item?.verification_stages);
    updateCurrentStage(item?.verification_stages[0]);
    routeRef.current = 'done';
  };

  useEffect(() => {
    if (stageData?.startRoute && routeRef.current) {
      routeRef.current = null;
      router.push(stageData?.startRoute);
    }
  }, [stageData, routeRef.current]);

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
        {verificationEntry?.map((item: verificationEntry, index) => (
          <div
            key={item?.title + index}
            className={`cursor-pointer flex items-center justify-items-center gap-2 bg-stone-100 hover:bg-stone-200 px-4 ${
              index === 0
                ? 'rounded-t-2xl'
                : index === verificationEntry.length - 1
                ? 'rounded-b-2xl'
                : ''
            }`}
            onClick={() => handleVerification(item)}
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
          </div>
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
