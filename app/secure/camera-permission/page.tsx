'use client';

import ReuseAlert from '@/app/components/ReuseAlert';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { useRouter, usePathname } from 'next/navigation';
import useStore from '@/store/store';
import { useEffect, useState } from 'react';

const CameraPermission = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { updateCurrentStage } = useStore();

  const [cameraAccess, setCameraAccess] = useState<boolean>(false);

  const navigateToNext = () => {
    router.push('live-capture');
  };

  // Request camera permission and display a message if given or denied
  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      stream.getVideoTracks().forEach((track) => track.stop());
      setCameraAccess(true);
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraAccess(false);
    }
  };

  useEffect(() => {
    requestCameraAccess();
  }, []);

  // UPDATE CURRENT STAGE
  useEffect(() => {
    updateCurrentStage('LIVELINESS_TEST');
  }, []);

  // console.log('CURRENT', stageData);

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

        <Title center className=" mt-6">
          Camera Access Needed
        </Title>

        <Body center>
          We need access to your camera for security verification.
        </Body>
      </header>

      {/* Body */}
      <main className="p-4">
        <Body className="mb-4">
          To ensure the security and integrity of your account, we request
          access to your device’s camera for::
        </Body>
        <Body>1. Face Recognition: To confirm your identity.</Body>
        <Body>2. Document Scan: To verify your credentials.</Body>

        <ReuseAlert title="Your Privacy is Safe" className="mt-4">
          Your data is encrypted and used only for verification.
        </ReuseAlert>
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton action={navigateToNext} disabled={!cameraAccess}>
          Continue
        </ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default CameraPermission;
