import React, { useState } from 'react';
import { Board } from './components/Board';
import { PlayerHand } from './components/PlayerHand';
import { CardSelector } from './components/CardSelector';
import { ResultsTable } from './components/ResultsTable';
import { GameState, Card, Player } from './types/poker';
import { Plus, Trophy } from 'lucide-react';
import { evaluateHands } from './utils/pokerEvaluator';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    players: [],
    stage: 'preflop',
    showResults: false
  });

  const [showCardSelector, setShowCardSelector] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{
    type: 'board' | 'player';
    playerId?: number;
    cardIndex: number;
  } | null>(null);

  const addPlayer = () => {
    if (gameState.players.length < 9) {
      setGameState(prev => ({
        ...prev,
        players: [
          ...prev.players,
          {
            id: prev.players.length + 1,
            name: `Player ${prev.players.length + 1}`,
            cards: []
          }
        ]
      }));
    }
  };

  const handleCardSelect = (card: Card) => {
    if (!selectedPosition) return;

    setGameState(prev => {
      if (selectedPosition.type === 'board') {
        const newBoard = [...prev.board];
        newBoard[selectedPosition.cardIndex] = card;
        return { ...prev, board: newBoard };
      } else if (selectedPosition.type === 'player' && selectedPosition.playerId) {
        const newPlayers = prev.players.map(player => {
          if (player.id === selectedPosition.playerId) {
            const newCards = [...player.cards];
            newCards[selectedPosition.cardIndex] = card;
            return { ...player, cards: newCards };
          }
          return player;
        });
        return { ...prev, players: newPlayers };
      }
      return prev;
    });

    setShowCardSelector(false);
    setSelectedPosition(null);
  };

  const handlePlayerNameChange = (playerId: number, newName: string) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(player =>
        player.id === playerId ? { ...player, name: newName } : player
      )
    }));
  };

  const getAllUsedCards = (): Card[] => {
    const boardCards = gameState.board;
    const playerCards = gameState.players.flatMap(player => player.cards);
    return [...boardCards, ...playerCards];
  };

  const evaluateAndShowResults = () => {
    const rankedPlayers = evaluateHands(gameState.players, gameState.board);
    setGameState(prev => ({
      ...prev,
      players: rankedPlayers,
      showResults: true
    }));
  };

  const canShowResults = () => {
    return gameState.board.length >= 3 && 
           gameState.players.length >= 2 &&
           gameState.players.every(player => player.cards.length === 2);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
          <Trophy className="text-yellow-400" />
          Poker Hand Comparison
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Board 
                cards={gameState.board}
                onCardSelect={() => {
                  setSelectedPosition({ type: 'board', cardIndex: gameState.board.length });
                  setShowCardSelector(true);
                }}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Players</h2>
                <div className="flex gap-4">
                  <button
                    onClick={evaluateAndShowResults}
                    disabled={!canShowResults()}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Show Results
                  </button>
                  <button
                    onClick={addPlayer}
                    disabled={gameState.players.length >= 9}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                  >
                    <Plus size={20} />
                    Add Player
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameState.players.map(player => (
                  <PlayerHand
                    key={player.id}
                    player={player}
                    onCardSelect={() => {
                      setSelectedPosition({
                        type: 'player',
                        playerId: player.id,
                        cardIndex: player.cards.length
                      });
                      setShowCardSelector(true);
                    }}
                    onNameChange={handlePlayerNameChange}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {gameState.showResults && (
              <ResultsTable players={gameState.players} />
            )}
          </div>
        </div>

        {showCardSelector && (
          <CardSelector
            onCardSelect={handleCardSelect}
            onClose={() => {
              setShowCardSelector(false);
              setSelectedPosition(null);
            }}
            usedCards={getAllUsedCards()}
          />
        )}
      </div>
    </div>
  );
}

export default App;