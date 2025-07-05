'use client';

import Image from 'next/image';
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
      const stream = await navigator?.mediaDevices?.getUserMedia({
        video: true,
      });
      stream?.getVideoTracks()?.forEach((track) => track.stop());
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

        <Image
          aria-hidden
          src="/images/camera.svg"
          alt="iSecure camera"
          width={40}
          height={40}
          className="mx-auto h-16 w-16"
        />

        <Title center className=" mt-4">
          Camera Access Needed
        </Title>

        <div className="px-4 mt-2">
          <p className="mb-4 text-stone-600 text-sm">
            To ensure the security and integrity of your account, we request
            access to your device's camera for:
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li className="text-sm text-stone-600">
              <span className="font-medium">Face Recognition:</span> To confirm
              your identity.
            </li>
            <li className="text-sm text-stone-600">
              <span className="font-medium">Document Scan:</span> To verify your
              credentials.
            </li>
          </ol>
        </div>
      </header>

      {/* Body */}
      <main className="p-4"></main>

      {/* Footer */}
      <footer>
        <ReuseAlert title="Your Privacy is Safe" className="mt-4 mb-4">
          Your data is encrypted and used only for verification.
        </ReuseAlert>

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
