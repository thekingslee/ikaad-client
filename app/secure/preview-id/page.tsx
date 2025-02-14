'use client';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useStore from '@/store/store';

const PreviewId = () => {
  const pathname = usePathname();
  const { currentStage, stageData, verificationStages, updateCurrentStage } =
    useStore();

  const navigateToRetake = () => {
    router.replace('capture-id');
  };
  const navigateToNext = () => {
    router.push(stageData?.startRoute);
  };

  useEffect(() => {
    // Update StageData with the next stage if this is the endRoute of the current stage
    if (stageData?.endRoute === pathname) {
      console.log('PP', verificationStages);
      updateCurrentStage(verificationStages[currentStage + 1]);
    }
  }, []);

  const router = useRouter();
  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

        <Title center className="mt-6">
          Preview your ID
        </Title>

        <Body center className="text-xs mt-2">
          Please take a moment to review the captured image to ensure it is
          clear and readable.
        </Body>
      </header>

      {/* Main */}
      <main className="px-4 ">
        <div className="h-52 w-full border-4 border-stone-900 mx-auto rounded-xl">
          {/* Image goes here */}
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="grid gap-2">
          <ReuseButton variant="secondary" action={navigateToRetake}>
            Retake
          </ReuseButton>
          <ReuseButton action={navigateToNext}>Continue</ReuseButton>
        </div>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default PreviewId;
