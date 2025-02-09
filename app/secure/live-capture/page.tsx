'use client';

import ReuseNav from '@/app/components/ReuseNav';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Title from '@/components/atoms/Title';
import ReuseButton from '@/app/components/ReuseButton';
import Body from '@/components/atoms/Body';

const LiveCapture = () => {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // TODO:
  // Load the camera into the video component
  // Prepare the model, make sure they running
  // Write algorithms to test the 3 liveliness tests
  // - Detect face in recording area
  // - Detect a smile
  // - Detect a blink
  // Display appropriate instuctions for each test
  // Navigate the confirm-video page

  const navigateToNext = () => {
    router.push('confirm-video');
  };

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />
      </header>

      {/* Body */}
      <main className="px-8 h-full flex flex-col justify-between">
        <div className="w-72 h-72  bg-slate-100 border-4 border-stone-900 mx-auto rounded-full">
          <video
            crossOrigin="anonymous"
            height="694"
            ref={videoRef}
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            playsInline={true}
            autoPlay
          ></video>
        </div>

        <Title center>Are you set? Click Ready to start the recording</Title>
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton action={navigateToNext}>Ready</ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default LiveCapture;
