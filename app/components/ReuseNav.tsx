'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ReuseNav = () => {
  const router = useRouter();

  const goBack = () => {
    router?.back();
  };

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

  return (
    <nav className="borde border-stone-100 flex items-center justify-between py-2">
      <Button
        onClick={goBack}
        className="px-[10px] pt-0 rounded-full"
        variant={'ghost'}
      >
        <Image
          aria-hidden
          src="/images/icons/return.svg"
          alt="Return icon"
          width={18}
          height={18}
          className="mx-auto mt-6 mb-4 h-4 w-4"
        />
      </Button>

      <Button
        onClick={endFlow}
        className="px-3 pt-0 rounded-full"
        variant={'ghost'}
      >
        <Image
          aria-hidden
          src="/images/icons/close.svg"
          alt="Return icon"
          width={18}
          height={18}
          className="mx-auto mt-6 mb-4 h-[10px] w-[10px]"
        />
      </Button>
    </nav>
  );
};

export default ReuseNav;
