'use client';

import Image from 'next/image';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Subtitle from '@/components/atoms/Subtitle';
import ReuseButton from '@/app/components/ReuseButton';
import { useRouter } from 'next/navigation';
import useStore from '@/store/store';
import { useEffect } from 'react';

const Start = () => {
  const router = useRouter();

  const { stageData, updateCurrentStage } = useStore();

  const navigateToNext = () => {
    router.push(stageData?.nextStageRoute as string);
  };

  // UPDATE CURRENT STAGE
  useEffect(() => {
    updateCurrentStage('START');
  }, []);

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

        <Image
          aria-hidden
          src="/images/logo.svg"
          alt="iSecure logo"
          width={40}
          height={40}
          className="mx-auto mt-6"
        />
      </header>

      {/* Body */}
      <main>
        <div className="bg-[#FFFEFD] border border-textbody/50 p-4 rounded-lg text-sm text-left mb-4 ">
          <Subtitle>Before You Start, Please Ensure:</Subtitle>
          <Body className="text-xs mb-1">
            Good Lighting: Be in a well-lit environment.
          </Body>
          <Body className="text-xs mb-1">
            Face Visibility: Remove any items covering your face.
          </Body>
          <Body className="text-xs">
            Clear ID Display: Show your entire ID clearly.
          </Body>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton action={navigateToNext}>Continue</ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default Start;
