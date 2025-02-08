'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ReuseNav = () => {
  const router = useRouter();

  const goBack = () => {
    router?.back();
  };

  return (
    <nav className="border-b border-stone-100 flex items-center justify-between px-4">
      <button onClick={goBack}>
        <Image
          aria-hidden
          src="/globe.svg" // TODO: Replace Icon
          alt="Return icon"
          width={18}
          height={18}
          className="mx-auto mt-6 mb-4"
        />
      </button>

      <button onClick={goBack}>
        <Image
          aria-hidden
          src="/globe.svg" // TODO: Replace Icon
          alt="Close icon"
          width={18}
          height={18}
          className="mx-auto mt-6 mb-4"
        />
      </button>
    </nav>
  );
};

export default ReuseNav;
