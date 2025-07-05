'use client';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import useStore from '@/store/store';
import useUploadIdStore from '@/store/uploadIdStore';

const PreviewId = () => {
  const router = useRouter();
  const { stageData, updateCurrentStage } = useStore();
  const { uploadId } = useUploadIdStore();
  const searchParams = useSearchParams();
  const source = searchParams.get('source') || 'unknown';

  const navigateToRetake = () => {
    if (source === 'upload') {
      router.replace('upload-id');
    } else {
      router.replace('capture-id');
    }
  };
  const navigateToNext = () => {
    router.push(stageData?.nextStageRoute as string);
  };

  // UPDATE CURRENT STAGE
  useEffect(() => {
    updateCurrentStage('DOCUMENT_CAPTURE');
  }, []);
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
        <div className="h-52 w-full border-4 border-custom-text p-2 mx-auto rounded-xl relative">
          {/* Image goes here */}
          <Image
            src={uploadId}
            alt="Uploaded ID"
            layout="fill"
            className="object-cover rounded-lg"
          />
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="grid gap-2">
          <ReuseButton variant="secondary" action={navigateToRetake}>
            {source === 'upload' ? 'Re-upload' : 'Retake'}
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
