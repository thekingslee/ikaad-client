'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import useUserDataStore from '@/store/userData';
import { ApplicationDocumentType } from '@/common/enums';

type CardType =
  | { type: 'International Passport'; active: boolean }
  | { type: 'NIN Slip'; active: boolean }
  | { type: "Driver's Licence"; active: boolean }
  | { type: "Voter's Card"; active: boolean };

const SelectDoc = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserDataStore();
  const [card, setCard] = useState<CardType>();

  const cardTypes: CardType[] = [
    { type: 'International Passport', active: false },
    { type: 'NIN Slip', active: true },
    { type: "Driver's Licence", active: false },
    { type: "Voter's Card", active: true },
  ];

  // Map UI card type to ApplicationDocumentType
  const cardTypeToEnum: Record<string, ApplicationDocumentType> = {
    'International Passport': ApplicationDocumentType.PASSPORT,
    'NIN Slip': ApplicationDocumentType.NIN,
    "Driver's Licence": ApplicationDocumentType.DRIVER_LICENSE,
    "Voter's Card": ApplicationDocumentType.VOTERS_CARD,
  };

  useEffect(() => {
    if (!card) {
      setCard(cardTypes.find((item) => item.active));
    }
  }, []);

  const navigateToNext = () => {
    console.log('card', card);
    if (card) {
      setUserData({ ...userData, docType: cardTypeToEnum[card.type] });
    }
    router.push('upload-id');
  };

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

        <Title center className="mt-6">
          Select your identification type
        </Title>
      </header>

      {/* Body */}
      <main className="px-4 text-center">
        {cardTypes.map((item, index) => {
          const isSelected = card ? card.type === item.type : false;
          return (
            <motion.button
              key={item.type + index}
              className={`bg-stone-100  px-4 py-2 rounded-xl inline-block mr-2 mb-2 ${
                item.active
                  ? `cursor-pointer ${
                      isSelected ? 'text-custom-text' : 'text-title'
                    }`
                  : 'cursor-not-allowed border-none text-title-body/50 bg-stone-100/80'
              } border
                 ${
                   isSelected
                     ? ' text-custom-text ring-custom-text border-custom-text'
                     : ' ring-stone-100 border-ttle-body/20'
                 } 
                 ${isSelected && ' text-custom-text font-semibold'}`}
              onClick={() => {
                if (item.active) setCard(item);
              }}
              layout
              initial={false}
              // animate={{
              //   backgroundColor: isSelected
              //     ? 'red'
              //     : 'white',
              // }}
              // whileHover={{
              //   backgroundColor: isSelected
              //     ? '#2a1711'
              //     : 'rgba(39, 39, 42, 0.8)',
              // }}
              // whileTap={{
              //   backgroundColor: isSelected
              //     ? '#1f1209'
              //     : 'rgba(39, 39, 42, 0.9)',
              // }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.5,
                backgroundColor: { duration: 0.1 },
              }}
            >
              <motion.div
                className="relative flex items-center"
                animate={{
                  width: isSelected ? 'auto' : '100%',
                  paddingRight: isSelected ? '1.5rem' : '0',
                }}
                transition={{
                  ease: [0.175, 0.885, 0.32, 1.275],
                  duration: 0.3,
                }}
              >
                <span>{item.type}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        mass: 0.5,
                      }}
                      className="absolute right-0"
                    >
                      <div className="w-4 h-4 rounded-full bg-custom-green flex items-center justify-center">
                        <Check
                          className="w-3 h-3 text-[#fff]"
                          strokeWidth={1.5}
                        />
                      </div>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          );
        })}
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton action={navigateToNext} disabled={!card}>
          Continue
        </ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default SelectDoc;
