'use client';

import { useRef, useEffect } from 'react';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import { useRouter } from 'next/navigation';
import Subtitle from '@/components/atoms/Subtitle';
import useLiveCaptureStore from '@/store/liveCaptureStore';
import useStore from '@/store/store';

const ConfirmVideo = () => {
  const router = useRouter();
  const { userRecording } = useLiveCaptureStore();
  const { stageData, updateCurrentStage } = useStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = userRecording;
    }
  }, [userRecording]);

  const navigateToRetake = () => {
    router.replace('live-capture');
  };
  const navigateToNext = () => {
    router.push(stageData?.nextStageRoute);
  };

  // UPDATE CURRENT STAGE
  useEffect(() => {
    updateCurrentStage('LIVELINESS_TEST');
  }, []);

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />
      </header>

      {/* TODO: Upload video recorded to BE */}

      {/* Body */}
      <main className="px-8 h-full">
        <div className="w-full h-auto border-4 border-custom-green p-1 mx-auto relative overflow-hidden rounded-full aspect-square">
          <video
            crossOrigin="anonymous"
            height="694"
            ref={videoRef}
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            playsInline={true}
            autoPlay
            loop
            className="rounded-full"
          ></video>
        </div>

        <div className="mt-4">
          <Subtitle center>Capture complete!</Subtitle>
          <Body center>
            Please take a moment to review the captured image to ensure it is
            clear
          </Body>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="grid gap-2">
          <ReuseButton action={navigateToRetake} variant="outline">
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

export default ConfirmVideo;
