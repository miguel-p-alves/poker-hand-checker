export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export interface Player {
  id: number;
  name: string;
  cards: Card[];
  handRank?: number;
  handName?: string;
}

export interface GameState {
  board: Card[];
  players: Player[];
  stage: 'preflop' | 'flop' | 'turn' | 'river';
  showResults: boolean;
}