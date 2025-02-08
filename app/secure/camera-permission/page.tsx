'use client';

import ReuseAlert from '@/app/components/ReuseAlert';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { useRouter } from 'next/navigation';

const CameraPermission = () => {
  const router = useRouter();

  const navigateToNext = () => {
    router.push('live-capture');
  };

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

        <Title center className="mb-3 mt-6">
          Camera Access Needed
        </Title>

        <Body center>
          We need access to your camera for security verification.
        </Body>
      </header>

      {/* Body */}
      <main>
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
        <ReuseButton action={navigateToNext}>Continue</ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default CameraPermission;
