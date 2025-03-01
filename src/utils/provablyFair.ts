import SHA256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

// Generate a random server seed
export const generateServerSeed = (): string => {
  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Generate a random client seed
export const generateClientSeed = (): string => {
  const randomBytes = new Uint8Array(16);
  window.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Hash the server seed to share with the client before the game
export const hashServerSeed = (serverSeed: string): string => {
  return SHA256(serverSeed).toString(Hex);
};

// Generate a dice roll (1-6) using the combined seeds and nonce
export const generateDiceRoll = (
  serverSeed: string,
  clientSeed: string,
  nonce: number
): number => {
  // Combine the seeds and nonce
  const combinedSeed = `${serverSeed}:${clientSeed}:${nonce}`;
  
  // Generate a hash
  const hash = SHA256(combinedSeed).toString(Hex);
  
  // Use the first 8 characters of the hash as a hex number
  const hexSubstring = hash.substring(0, 8);
  
  // Convert to a decimal number
  const decimalValue = parseInt(hexSubstring, 16);
  
  // Get a number between 1 and 6 (inclusive)
  return (decimalValue % 6) + 1;
};

// Verify a previous roll
export const verifyRoll = (
  revealedServerSeed: string,
  clientSeed: string,
  nonce: number,
  diceValue: number
): boolean => {
  const calculatedRoll = generateDiceRoll(revealedServerSeed, clientSeed, nonce);
  return calculatedRoll === diceValue;
};

// Determine if the roll is a win (4, 5, or 6)
export const isWinningRoll = (diceValue: number): boolean => {
  return diceValue >= 4;
};

// Calculate payout based on bet amount and roll result
export const calculatePayout = (betAmount: number, diceValue: number): number => {
  return isWinningRoll(diceValue) ? betAmount * 2 : 0;
};