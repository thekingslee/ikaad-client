'use client';

import Image from 'next/image';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseDrawer from '@/app/components/ReuseDrawer';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useStore from '@/store/store';

const Finish = () => {
  const router = useRouter();
  const { updateCurrentStage } = useStore();

  const [open, setOpen] = useState<boolean>(false);
  const endFlow = () => {
    // Close verification
    // Navigate to home "/"
    router.push('/');
  };

  // UPDATE CURRENT STAGE
  useEffect(() => {
    updateCurrentStage('FINISH');
  }, []);

  return (
    <>
      {/* Header */}
      <header>{/* <ReuseNav /> */}</header>

      {/* Body */}
      <main className="px-4 text-center">
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={40}
          height={40}
          className="mx-auto mt-6 mb-4"
        />
        <Title center className="mt-6">
          Verification complete
        </Title>
        <ReuseDrawer setOpen={setOpen} open={open} />
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton variant="default" action={endFlow}>
          Done
        </ReuseButton>
        <ReuseButton variant="secondary" action={() => setOpen(true)}>
          View results
        </ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default Finish;
