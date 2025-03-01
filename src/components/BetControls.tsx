import React from 'react';
import { Dice5 } from 'lucide-react';

interface BetControlsProps {
  balance: number;
  betAmount: number;
  isRolling: boolean;
  onBetChange: (amount: number) => void;
  onRoll: () => void;
}

const BetControls: React.FC<BetControlsProps> = ({
  balance,
  betAmount,
  isRolling,
  onBetChange,
  onRoll,
}) => {
  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      onBetChange(value);
    }
  };

  const handleQuickBet = (multiplier: number) => {
    const newBet = Math.min(balance, Math.max(1, Math.floor(balance * multiplier)));
    onBetChange(newBet);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="betAmount" className="block text-sm font-medium text-gray-300 mb-1">
          Bet Amount
        </label>
        <div className="flex items-center">
          <input
            type="number"
            id="betAmount"
            value={betAmount}
            onChange={handleBetChange}
            min="1"
            max={balance}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isRolling}
          />
          <button
            onClick={() => onBetChange(balance)}
            className="px-3 py-2 bg-gray-700 border border-gray-700 border-l-0 rounded-r-md text-white hover:bg-gray-600 focus:outline-none"
            disabled={isRolling}
          >
            MAX
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        <button
          onClick={() => handleQuickBet(0.1)}
          className="px-2 py-1 bg-gray-700 rounded text-white text-sm hover:bg-gray-600 focus:outline-none"
          disabled={isRolling}
        >
          10%
        </button>
        <button
          onClick={() => handleQuickBet(0.25)}
          className="px-2 py-1 bg-gray-700 rounded text-white text-sm hover:bg-gray-600 focus:outline-none"
          disabled={isRolling}
        >
          25%
        </button>
        <button
          onClick={() => handleQuickBet(0.5)}
          className="px-2 py-1 bg-gray-700 rounded text-white text-sm hover:bg-gray-600 focus:outline-none"
          disabled={isRolling}
        >
          50%
        </button>
        <button
          onClick={() => handleQuickBet(1)}
          className="px-2 py-1 bg-gray-700 rounded text-white text-sm hover:bg-gray-600 focus:outline-none"
          disabled={isRolling}
        >
          100%
        </button>
      </div>

      <button
        onClick={onRoll}
        disabled={isRolling || betAmount <= 0 || betAmount > balance}
        className={`w-full py-3 rounded-md flex items-center justify-center text-white font-bold text-lg transition-colors ${
          isRolling || betAmount <= 0 || betAmount > balance
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        <Dice5 className="mr-2" size={24} />
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default BetControls;