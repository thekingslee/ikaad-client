'use client';

import Link from 'next/link';
import Image from 'next/image';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { Button } from '@/components/ui/button';
import Subtitle from '@/components/atoms/Subtitle';
import { useRouter } from 'next/navigation';
import useStore, { VericationStageTypes } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { authService, UserData } from '@/services/auth';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ShareModal from '@/app/components/ShareModal';
import { Share2 } from 'lucide-react';

type verificationEntry = {
  title: string;
  img: string;
  body: string;
  verification_stages: VericationStageTypes[];
};

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [verificationLink, setVerificationLink] = useState('');
  const {
    currentStage,
    stageData,
    generatedVerificationMap,
    setVerificationStages,
    updateCurrentStage,
  } = useStore();
  const routeRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await authService.getUser();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  const verificationEntry: verificationEntry[] = [
    {
      title: 'BVN Verification',
      img: '/images/security.svg',
      body: 'Confirm your identity using BVN to prevent fraud and unauthorized access.',
      verification_stages: ['START', 'LIVELINESS_TEST', 'BVN', 'FINISH'],
    },
    {
      title: 'Document Verification',
      img: '/images/card.svg',
      body: 'Upload and scan your official ID to confirm your identity.',
      verification_stages: [
        'START',
        'LIVELINESS_TEST',
        'DOCUMENT_CAPTURE',
        'FINISH',
      ],
    },
  ];

  const handleVerification = (item: verificationEntry) => {
    setVerificationStages(item?.verification_stages);
    updateCurrentStage(item?.verification_stages[0]);
    const stages = JSON.stringify(item.verification_stages);
    const link = `${
      window.location.origin
    }/secure/prestart?verification-stages=${encodeURIComponent(stages)}`;
    setVerificationLink(link);
    setIsShareModalOpen(true);
  };

  useEffect(() => {
    if (stageData?.route && routeRef.current) {
      routeRef.current = null;
      router.push(stageData?.route);
    }
  }, [stageData, routeRef.current]);

  // console.log('currentStage', currentStage);
  // console.log('stageData', stageData);
  // console.log('generatedVerificationMap', generatedVerificationMap);

  return (
    <>
      {/* Header */}
      <header>
        <figure className="p-[1px] border-[3px] border-btn-text mb-2 mt-6 h-28 w-28 mx-auto rounded-full flex justify-items-center items-center">
          {userData?.image_url && (
            <Image
              aria-hidden
              src={userData?.image_url || ''}
              alt="Profile photo"
              width={160}
              height={160}
              className="rounded-full h-full"
            />
          )}
        </figure>
        <Title center>
          {isLoading ? (
            <Skeleton width={160} className="mx-auto" />
          ) : (
            `Hello ${userData?.username || 'User'}`
          )}
        </Title>
        <Body center>
          You've been given access to test the first Anti-Money Laundering
          product from Southeast Nigeria.
        </Body>

        <p className={`mt-4 text-sm text-title text-center`}>
          {' '}
          {userData?.application_count || 0}/{userData?.application_credit || 5}{' '}
          Trials left
        </p>

        <div className="flex justify-center mt-2 mb-2">
          <Link href="/applications" className="inline-block">
            <Button className="rounded-full bg-custom-text hover:bg-custom-text/80 text-white">
              View Applications
            </Button>
          </Link>
        </div>
      </header>
      {/* Body */}
      <main className="flex flex-col mt-6">
        {verificationEntry?.map((item: verificationEntry, index) => (
          <div
            key={item?.title + index}
            className={`py-4 cursor-pointer flex items-center justify-items-center gap-2 bg-[#FFFEFD] hover:bg-[#FFF88]  border border-textbody px-4 transition-all duration-200
              ${index === 0 ? 'rounded-t-2xl ' : ''}
              ${index === verificationEntry.length - 1 ? 'rounded-b-2xl ' : ''}
              hover:scale-105 hover:rounded-t-2xl hover:rounded-b-2xl`}
            onClick={() => handleVerification(item)}
          >
            <Image
              aria-hidden
              src={item?.img}
              alt="Globe icon"
              className="w-10 h-10 mr-2"
              width={48}
              height={48}
            />
            <div className="w-full">
              <Subtitle className="text-base">
                {'Try ' + item?.title + '  →'}
              </Subtitle>
              <Body className="text-xs">{item?.body}</Body>
            </div>
          </div>
        ))}
      </main>
      {/* Footer */}
      <footer>
        <Body center className="text-xs mt-2">
          <>
            Powered by <span className="text-stone-400">IKaad</span>
          </>
        </Body>
      </footer>

      {/* // Style Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        link={verificationLink}
      />
    </>
  );
};

const ProtectedHome = () => {
  return (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  );
};

export default ProtectedHome;
