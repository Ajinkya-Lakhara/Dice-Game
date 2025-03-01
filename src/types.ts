export interface GameState {
  balance: number;
  betAmount: number;
  diceValue: number | null;
  isRolling: boolean;
  history: GameHistory[];
  serverSeed: string;
  clientSeed: string;
  nonce: number;
  previousServerSeed: string;
  previousServerSeedHash: string;
  previousClientSeed: string;
  previousNonce: number;
}

export interface GameHistory {
  id: number;
  betAmount: number;
  diceValue: number;
  won: boolean;
  payout: number;
  serverSeed: string;
  clientSeed: string;
  nonce: number;
  timestamp: number;
}

export interface RollResult {
  diceValue: number;
  won: boolean;
  payout: number;
  newServerSeed: string;
  newServerSeedHash: string;
  previousServerSeed: string;
  nonce: number;
}