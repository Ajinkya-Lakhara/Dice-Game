import React, { useState, useEffect } from 'react';
import { Dice5 } from 'lucide-react';
import DiceDisplay from './components/DiceDisplay';
import BetControls from './components/BetControls';
import GameHistory from './components/GameHistory';
import ProvablyFairInfo from './components/ProvablyFairInfo';
import { GameState, GameHistory as GameHistoryType, RollResult } from './types';
import {
  generateServerSeed,
  generateClientSeed,
  hashServerSeed,
  generateDiceRoll,
  isWinningRoll,
  calculatePayout
} from './utils/provablyFair';

// Initial game state
const initialState: GameState = {
  balance: 1000,
  betAmount: 10,
  diceValue: null,
  isRolling: false,
  history: [],
  serverSeed: generateServerSeed(),
  clientSeed: generateClientSeed(),
  nonce: 0,
  previousServerSeed: '',
  previousServerSeedHash: '',
  previousClientSeed: '',
  previousNonce: 0
};

// Load state from localStorage if available
const loadState = (): GameState => {
  try {
    const savedState = localStorage.getItem('diceGameState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }
  return initialState;
};

function App() {
  const [gameState, setGameState] = useState<GameState>(loadState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('diceGameState', JSON.stringify(gameState));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }, [gameState]);

  const handleBetChange = (amount: number) => {
    setGameState(prevState => ({
      ...prevState,
      betAmount: amount
    }));
  };

  const handleClientSeedChange = (newSeed: string) => {
    setGameState(prevState => ({
      ...prevState,
      clientSeed: newSeed
    }));
  };

  const rollDice = () => {
    // Validate bet amount
    if (gameState.betAmount <= 0 || gameState.betAmount > gameState.balance) {
      return;
    }

    // Set rolling state
    setGameState(prevState => ({
      ...prevState,
      isRolling: true
    }));

    // Simulate server-side processing
    setTimeout(() => {
      // Generate dice roll using provably fair algorithm
      const diceValue = generateDiceRoll(
        gameState.serverSeed,
        gameState.clientSeed,
        gameState.nonce
      );

      // Determine if the roll is a win
      const won = isWinningRoll(diceValue);

      // Calculate payout
      const payout = calculatePayout(gameState.betAmount, diceValue);

      // Generate new server seed for next roll
      const newServerSeed = generateServerSeed();
      const newServerSeedHash = hashServerSeed(newServerSeed);

      // Create history entry
      const historyEntry: GameHistoryType = {
        id: Date.now(),
        betAmount: gameState.betAmount,
        diceValue,
        won,
        payout,
        serverSeed: gameState.serverSeed,
        clientSeed: gameState.clientSeed,
        nonce: gameState.nonce,
        timestamp: Date.now()
      };

      // Update game state
      setGameState(prevState => ({
        ...prevState,
        balance: prevState.balance - prevState.betAmount + payout,
        diceValue,
        isRolling: false,
        history: [...prevState.history, historyEntry],
        serverSeed: newServerSeed,
        previousServerSeed: prevState.serverSeed,
        previousServerSeedHash: prevState.previousServerSeedHash,
        previousClientSeed: prevState.clientSeed,
        previousNonce: prevState.nonce,
        nonce: prevState.nonce + 1
      }));
    }, 1000);
  };

  const resetBalance = () => {
    setGameState(prevState => ({
      ...prevState,
      balance: 1000
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Dice5 size={32} className="text-purple-500 mr-2" />
            <h1 className="text-2xl font-bold">Roll The Dice</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 px-4 py-2 rounded-md">
              <span className="text-gray-400 mr-2">Balance:</span>
              <span className="font-bold">${gameState.balance.toFixed(2)}</span>
            </div>
            {gameState.balance === 0 && (
              <button
                onClick={resetBalance}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Reset Balance
              </button>
            )}
          </div>
        </header>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Roll 4, 5, or 6 to win!</h2>
            <p className="text-gray-400">Win 2x your bet amount</p>
          </div>

          <DiceDisplay value={gameState.diceValue} isRolling={gameState.isRolling} />

          <BetControls
            balance={gameState.balance}
            betAmount={gameState.betAmount}
            isRolling={gameState.isRolling}
            onBetChange={handleBetChange}
            onRoll={rollDice}
          />
        </div>

        <GameHistory history={gameState.history} />

        <ProvablyFairInfo
          serverSeedHash={hashServerSeed(gameState.serverSeed)}
          previousServerSeed={gameState.previousServerSeed}
          clientSeed={gameState.clientSeed}
          previousClientSeed={gameState.previousClientSeed}
          nonce={gameState.nonce}
          previousNonce={gameState.previousNonce}
          lastRoll={gameState.history.length > 0 ? gameState.history[gameState.history.length - 1].diceValue : null}
          onChangeClientSeed={handleClientSeedChange}
        />

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Provably Fair Dice Game. All rights reserved.</p>
          <p className="mt-1">This is a demonstration of a provably fair gambling system.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
