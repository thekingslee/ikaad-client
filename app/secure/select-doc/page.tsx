'use client';

import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import { useState } from 'react';

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
        {cardTypes.map((item, index) => (
          <div
            key={item + index}
            className={`bg-stone-100 p-3 px-4 rounded-xl inline-block mr-2 mb-2 cursor-pointer border border-stone-100 text-stone-600 ${
              card === item && ' border-stone-900 text-stone-900'
            }`}
            onClick={() => {
              setCard(item);
            }}
          >
            {item}
          </div>
        ))}
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
