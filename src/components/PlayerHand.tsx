import React, { useState } from 'react';
import { Card } from './Card';
import { Player } from '../types/poker';
import { Edit2 } from 'lucide-react';

interface PlayerHandProps {
  player: Player;
  onCardSelect?: () => void;
  onNameChange: (playerId: number, newName: string) => void;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({ player, onCardSelect, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(player.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = tempName.trim();
    if (trimmedName) {
      onNameChange(player.id, trimmedName);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-blue-900 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-1 mr-2">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full px-2 py-1 rounded text-gray-900"
              autoFocus
              onBlur={handleSubmit}
            />
          </form>
        ) : (
          <h3 className="text-white font-medium flex-1">{player.name}</h3>
        )}
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setTempName(player.name);
          }}
          className="text-white/70 hover:text-white transition-colors"
        >
          <Edit2 size={16} />
        </button>
      </div>
      <div className="flex gap-2">
        {[...Array(2)].map((_, i) => (
          <Card 
            key={i} 
            card={player.cards[i]} 
            onClick={onCardSelect}
            selectable={!player.cards[i]}
          />
        ))}
      </div>
    </div>
  );
};