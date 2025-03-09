import React from 'react';
import { Heart, Diamond, Club, Spade } from 'lucide-react';
import { Card as CardType } from '../types/poker';
import clsx from 'clsx';

interface CardProps {
  card?: CardType;
  onClick?: () => void;
  selectable?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, selectable = false }) => {
  if (!card) {
    return (
      <div 
        className={clsx(
          "w-20 h-28 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center",
          selectable && "hover:bg-gray-300 cursor-pointer"
        )}
        onClick={onClick}
      >
        <span className="text-gray-400">+</span>
      </div>
    );
  }

  const getSuitIcon = () => {
    const props = { 
      className: clsx(
        "w-6 h-6",
        card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-500' : 'text-black'
      )
    };

    switch (card.suit) {
      case 'hearts':
        return <Heart {...props} />;
      case 'diamonds':
        return <Diamond {...props} />;
      case 'clubs':
        return <Club {...props} />;
      case 'spades':
        return <Spade {...props} />;
    }
  };

  return (
    <div 
      className={clsx(
        "w-20 h-28 bg-white rounded-lg border-2 border-gray-300 p-2 flex flex-col items-center",
        selectable && "hover:border-blue-500 cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="text-xl font-bold self-start">
        {card.rank}
      </div>
      <div className="flex-grow flex items-center justify-center">
        {getSuitIcon()}
      </div>
      <div className="text-xl font-bold self-end rotate-180">
        {card.rank}
      </div>
    </div>
  );
};