'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { useState } from 'react';
import { Check } from 'lucide-react';

type CardType =
  | 'International Passport'
  | 'NIN Slip'
  | 'Driver’s Licence'
  | 'Voter’s Card';

const SelectDoc = () => {
  const [card, setCard] = useState<CardType>();

  const cardTypes: CardType[] = [
    'International Passport',
    'NIN Slip',
    'Driver’s Licence',
    'Voter’s Card',
  ];

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
          const isSelected = card ? card.includes(item) : false;
          return (
            <motion.button
              key={item + index}
              className={`bg-stone-100 px-4 py-2 rounded-xl inline-block mr-2 mb-2 cursor-pointer border border- 
                 ${
                   isSelected
                     ? 'text-stone-900 ring-stone-900 border-stone-900'
                     : 'text-stone-600  ring-stone-100'
                 } 
                 ${isSelected && '  text-stone-900'}`}
              onClick={() => {
                setCard(item);
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
                <span>{item}</span>
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
                      <div className="w-4 h-4 rounded-full bg-stone-900 flex items-center justify-center">
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
        <ReuseButton>Continue</ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default SelectDoc;
