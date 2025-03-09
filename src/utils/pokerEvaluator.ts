import { Hand } from 'pokersolver';
import { Card, Player } from '../types/poker';

const convertToPokerSolverFormat = (card: Card): string => {
  const suitMap: Record<string, string> = {
    'hearts': 'h',
    'diamonds': 'd',
    'clubs': 'c',
    'spades': 's'
  };
  return `${card.rank}${suitMap[card.suit]}`;
};

export const evaluateHands = (players: Player[], board: Card[]): Player[] => {
  const boardCards = board.map(convertToPokerSolverFormat);
  
  const evaluatedPlayers = players.map(player => {
    if (player.cards.length !== 2) return { ...player, handRank: -1, handName: 'Incomplete hand' };

    const playerCards = player.cards.map(convertToPokerSolverFormat);
    const hand = Hand.solve([...playerCards, ...boardCards]);
    
    return {
      ...player,
      handRank: hand.rank,
      handName: hand.name
    };
  });

  // Sort players by hand rank (higher is better)
  return evaluatedPlayers.sort((a, b) => {
    if (a.handRank === -1) return 1;
    if (b.handRank === -1) return -1;
    return b.handRank! - a.handRank!;
  });
};