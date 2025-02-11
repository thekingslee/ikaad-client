'use client';

import { useRef, useEffect } from 'react';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import { useRouter } from 'next/navigation';
import Subtitle from '@/components/atoms/Subtitle';
import useLiveCaptureStore from '@/store/liveCaptureStore';

const ConfirmVideo = () => {
  const router = useRouter();
  const { userRecording } = useLiveCaptureStore();

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
    router.push('form-data');
  };

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />
      </header>

      {/* Body */}
      <main className="px-8 h-full">
        <div className="w-72 h-72 bg-stone-900 border-4 border-stone-900 mx-auto rounded-full relative overflow-hidden">
          <video
            crossOrigin="anonymous"
            height="694"
            ref={videoRef}
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            playsInline={true}
            autoPlay
            loop
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
          <ReuseButton action={navigateToRetake} variant="secondary">
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
