'use client';

import { useState } from 'react';
import Image from 'next/image';
import Body from '@/components/atoms/Body';
import ReuseAlert from '../components/ReuseAlert';
import Title from '@/components/atoms/Title';
import ReuseTable from '../components/ReuseTable';
import ReuseDrawer from '../components/ReuseDrawer';
import ReuseNav from '../components/ReuseNav';

type Payment = {
  id: string;
  name: string;
  reference_id: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  date: string;
};

// import { useMediaQuery } from "@/hooks/use-media-query"
// const isDesktop = useMediaQuery("(min-width: 768px)")

const ApplicationsPage: React.FC = () => {
  const [selected, setSelected] = useState<Payment>();
  const [open, setOpen] = useState<boolean>(false);

  const applications: Payment[] = [
    {
      id: '728ed52f',
      name: 'Olive Oil',
      reference_id: '728ed52f',
      status: 'pending',
      date: 'm@example.com',
    },
    {
      id: 'sdkljlsnd',
      name: 'Olive Oil',
      reference_id: '728ed52f',
      status: 'pending',
      date: 'm@example.com',
    },
    {
      id: 'sdsdwe',
      name: 'Olive Oil',
      reference_id: '728ed52f',
      status: 'pending',
      date: 'm@example.com',
    },

    // ...
  ];

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={40}
          height={40}
          className="mx-auto mt-6 mb-4"
        />

        <Title center className="mb-3">
          Completed Applications
        </Title>

        <ReuseAlert title="Important Notice">
          You are viewing sensitive user information. As a tester, it is your
          responsibility to safeguard all data and ensure it remains
          confidential.
        </ReuseAlert>
      </header>

      {/* Body */}
      <main className="overflow-x-auto">
        <ReuseTable
          data={applications}
          selected={selected}
          setSelected={setSelected}
          setOpen={setOpen}
        />

        <ReuseDrawer setOpen={setOpen} open={open} />
      </main>
      {/* Footer */}
      <footer>
        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default ApplicationsPage;
