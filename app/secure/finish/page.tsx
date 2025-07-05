'use client';

import Image from 'next/image';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseDrawer from '@/app/components/ReuseDrawer';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useStore from '@/store/store';
import { Application } from '@/services/applications';
import { ApplicationDocumentType } from '@/common/enums';
import { applicationsService } from '@/services/applications';

const Finish = () => {
  const router = useRouter();
  const { updateCurrentStage } = useStore();

  const [open, setOpen] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState<Application | null>(
    null
  );

  const endFlow = () => {
    // Clear sessionStorage
    sessionStorage.clear();

    // Close the window
    window.close();

    // Fallback: if window.close() doesn't work (due to browser security), navigate to home
    setTimeout(() => {
      if (!window.closed) {
        router.push('/');
      }
    }, 100);
  };

  // UPDATE CURRENT STAGE
  useEffect(() => {
    updateCurrentStage('FINISH');

    // Get application data from API using refId
    const applicationRef = sessionStorage.getItem('applicationRef');

    if (applicationRef) {
      const fetchApplicationData = async () => {
        try {
          const data = await applicationsService.getApplicationByRefId(
            applicationRef
          );
          console.log('Application data:', data);
          setApplicationData(data);
        } catch (error) {
          console.error('Error fetching application data:', error);
        }
      };

      fetchApplicationData();
    }
  }, []);

  return (
    <>
      {/* Header */}
      <header>{/* <ReuseNav /> */}</header>

      {/* Body */}
      <main className="px-4 text-center">
        <Image
          aria-hidden
          src="/images/success.svg"
          alt="Globe icon"
          width={60}
          height={60}
          className="mx-auto mt-6 mb-4"
        />
        <Title center className="mt-6">
          Verification complete
        </Title>
        {applicationData && (
          <ReuseDrawer setOpen={setOpen} open={open} data={applicationData} />
        )}
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton variant="default" action={endFlow}>
          Done
        </ReuseButton>
        {/* <ReuseButton variant="secondary" action={() => setOpen(true)}>
          View results
        </ReuseButton> */}

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default Finish;
