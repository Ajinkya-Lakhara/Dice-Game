import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { verifyRoll } from '../utils/provablyFair';

interface ProvablyFairInfoProps {
  serverSeedHash: string;
  previousServerSeed: string;
  clientSeed: string;
  previousClientSeed: string;
  nonce: number;
  previousNonce: number;
  lastRoll: number | null;
  onChangeClientSeed: (seed: string) => void;
}

const ProvablyFairInfo: React.FC<ProvablyFairInfoProps> = ({
  serverSeedHash,
  previousServerSeed,
  clientSeed,
  previousClientSeed,
  nonce,
  previousNonce,
  lastRoll,
  onChangeClientSeed,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newClientSeed, setNewClientSeed] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  const handleVerify = () => {
    if (lastRoll !== null && previousServerSeed && previousClientSeed) {
      const result = verifyRoll(
        previousServerSeed,
        previousClientSeed,
        previousNonce,
        lastRoll
      );
      setVerificationResult(result);
    }
  };

  const handleChangeClientSeed = () => {
    if (newClientSeed.trim()) {
      onChangeClientSeed(newClientSeed.trim());
      setNewClientSeed('');
    }
  };

  return (
    <div className="mt-8 bg-gray-800 rounded-md overflow-hidden">
      <button
        className="w-full p-4 flex justify-between items-center text-white font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Info size={18} className="mr-2 text-purple-400" />
          Provably Fair System
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-700">
          <p className="text-gray-300 mb-4">
            Our dice game uses a provably fair system to ensure that all rolls are random and cannot be manipulated.
            You can verify previous rolls using the server seed that is revealed after each game.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Current Server Seed Hash</h3>
              <div className="p-2 bg-gray-900 rounded text-gray-300 text-xs font-mono break-all">
                {serverSeedHash || 'N/A'}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Current Client Seed</h3>
              <div className="p-2 bg-gray-900 rounded text-gray-300 text-xs font-mono break-all">
                {clientSeed || 'N/A'}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Current Nonce</h3>
              <div className="p-2 bg-gray-900 rounded text-gray-300 text-xs font-mono">
                {nonce}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-700">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Previous Server Seed (Revealed)</h3>
              <div className="p-2 bg-gray-900 rounded text-gray-300 text-xs font-mono break-all">
                {previousServerSeed || 'N/A'}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Previous Client Seed</h3>
              <div className="p-2 bg-gray-900 rounded text-gray-300 text-xs font-mono break-all">
                {previousClientSeed || 'N/A'}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Previous Nonce</h3>
              <div className="p-2 bg-gray-900 rounded text-gray-300 text-xs font-mono">
                {previousNonce}
              </div>
            </div>

            {lastRoll !== null && (
              <div className="pt-2 border-t border-gray-700">
                <button
                  onClick={handleVerify}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none"
                >
                  Verify Last Roll
                </button>
                {verificationResult !== null && (
                  <div className={`mt-2 p-2 rounded ${verificationResult ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                    {verificationResult
                      ? 'Verification successful! The roll was fair.'
                      : 'Verification failed. The roll may have been manipulated.'}
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 border-t border-gray-700">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Change Client Seed</h3>
              <div className="flex">
                <input
                  type="text"
                  value={newClientSeed}
                  onChange={(e) => setNewClientSeed(e.target.value)}
                  placeholder="Enter new client seed"
                  className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-l text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleChangeClientSeed}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r hover:bg-purple-700 focus:outline-none"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvablyFairInfo;