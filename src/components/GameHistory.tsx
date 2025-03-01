import React from 'react';
import { GameHistory as GameHistoryType } from '../types';

interface GameHistoryProps {
  history: GameHistoryType[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="mt-8 p-4 bg-gray-800 rounded-md">
        <h2 className="text-xl font-bold text-white mb-2">Game History</h2>
        <p className="text-gray-400">No games played yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded-md">
      <h2 className="text-xl font-bold text-white mb-4">Game History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Roll
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Bet
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Result
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Payout
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {history.slice().reverse().map((game) => (
              <tr key={game.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-white">
                  {game.diceValue}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-white">
                  ${game.betAmount.toFixed(2)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      game.won ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                    }`}
                  >
                    {game.won ? 'WIN' : 'LOSS'}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-white">
                  ${game.payout.toFixed(2)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400">
                  {new Date(game.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameHistory;