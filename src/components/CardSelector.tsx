import React from 'react';
import { Card } from './Card';
import { Card as CardType, Suit, Rank } from '../types/poker';

interface CardSelectorProps {
  onCardSelect: (card: CardType) => void;
  onClose: () => void;
  usedCards: CardType[];
}

export const CardSelector: React.FC<CardSelectorProps> = ({ onCardSelect, onClose, usedCards }) => {
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: Rank[] = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

  const isCardUsed = (suit: Suit, rank: Rank) => {
    return usedCards.some(card => card.suit === suit && card.rank === rank);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Select a Card</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-13 gap-2">
          {ranks.map(rank => (
            suits.map(suit => (
              <div 
                key={`${rank}-${suit}`}
                className={isCardUsed(suit, rank) ? 'opacity-50 pointer-events-none' : ''}
                onClick={() => !isCardUsed(suit, rank) && onCardSelect({ suit, rank })}
              >
                <Card card={{ suit, rank }} selectable />
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};