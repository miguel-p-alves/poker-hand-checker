import React from 'react';
import { Player } from '../types/poker';
import { Trophy } from 'lucide-react';

interface ResultsTableProps {
  players: Player[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ players }) => {
  const getMedalColor = (position: number): string => {
    switch (position) {
      case 0: return 'text-yellow-400';
      case 1: return 'text-gray-400';
      case 2: return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-blue-600">
        <h3 className="text-xl font-bold text-white">Hand Rankings</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {players.map((player, index) => (
          <div 
            key={player.id}
            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <Trophy className={getMedalColor(index)} size={24} />
              <div>
                <div className="font-medium text-gray-900">
                  {player.name}
                </div>
                <div className="text-sm text-gray-500">
                  {player.handName || 'Waiting for cards...'}
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};