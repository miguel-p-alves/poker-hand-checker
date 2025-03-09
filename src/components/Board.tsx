import React from 'react';
import { Card } from './Card';
import { Card as CardType } from '../types/poker';

interface BoardProps {
  cards: CardType[];
  onCardSelect?: () => void;
}

export const Board: React.FC<BoardProps> = ({ cards, onCardSelect }) => {
  return (
    <div className="bg-green-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-white text-xl mb-4">Board</h2>
      <div className="flex gap-4">
        {[...Array(5)].map((_, i) => (
          <Card 
            key={i} 
            card={cards[i]} 
            onClick={onCardSelect}
            selectable={!cards[i]}
          />
        ))}
      </div>
    </div>
  );
};