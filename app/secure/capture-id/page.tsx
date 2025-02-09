'use client';

import { useRef } from 'react';
import ReuseAlert from '@/app/components/ReuseAlert';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import ReuseButton from '@/app/components/ReuseButton';
import { useRouter } from 'next/navigation';

const CaptureID = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

        <Title center className="mt-6">
          Capture ID
        </Title>

        <Body center className="text-xs mt-2">
          Please make sure you are in a well lit environment
        </Body>
      </header>

      {/* Main */}
      <main className="px-4 ">
        <div className="h-52 w-full border-4 border-stone-900 mx-auto rounded-xl">
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

        <ReuseAlert
          className="text-center relative bottom-8 max-w-64 mx-auto px-4"
          title="Capture the front of your ID "
        >
          Make sure your NIN Slip is properly placed, and hold it still for a
          few seconds
        </ReuseAlert>
      </main>

      {/* Footer */}
      <footer>
        <div className="grid gap-2">
          <ReuseButton action={() => router.push('preview-id')}>
            Capture
          </ReuseButton>
          <ReuseButton
            variant="secondary"
            action={() => router.push('upload-id')}
          >
            Upload Instead
          </ReuseButton>
        </div>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default CaptureID;
