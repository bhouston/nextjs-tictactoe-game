'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession } from '@/lib/user-session';
import Navigation from '@/components/Navigation';

interface GameRecord {
  id: string;
  result: 'win' | 'loss' | 'draw';
  createdAt: string;
}

interface GameStats {
  total: number;
  wins: number;
  losses: number;
  draws: number;
}

export default function HistoryPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [games, setGames] = useState<GameRecord[]>([]);
  const [stats, setStats] = useState<GameStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUserId = getUserSession();
    
    if (!currentUserId) {
      router.push('/welcome');
      return;
    }
    
    setUserId(currentUserId);
    
    const fetchGameHistory = async () => {
      try {
        const response = await fetch(`/api/games?userId=${currentUserId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch game history');
        }
        
        const data = await response.json();
        setGames(data.games);
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching game history:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch game history');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGameHistory();
  }, [router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getResultClass = (result: string) => {
    switch (result) {
      case 'win':
        return 'text-green-600 font-medium';
      case 'loss':
        return 'text-red-600 font-medium';
      case 'draw':
        return 'text-amber-600 font-medium';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Game History</h1>
        
        {isLoading && (
          <div className="text-center py-8">
            <p>Loading game history...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {!isLoading && !error && stats && (
          <div className="mb-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-gray-500 text-sm">Total Games</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-md text-center">
                  <p className="text-gray-500 text-sm">Wins</p>
                  <p className="text-2xl font-bold text-green-600">{stats.wins}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-md text-center">
                  <p className="text-gray-500 text-sm">Losses</p>
                  <p className="text-2xl font-bold text-red-600">{stats.losses}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-md text-center">
                  <p className="text-gray-500 text-sm">Draws</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.draws}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!isLoading && !error && games.length === 0 && (
          <div className="bg-blue-50 text-blue-700 p-6 rounded-lg text-center">
            <p className="mb-4">You haven't played any games yet!</p>
            <button 
              onClick={() => router.push('/game')} 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Start Playing
            </button>
          </div>
        )}
        
        {!isLoading && !error && games.length > 0 && (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {games.map((game) => (
                    <tr key={game.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(game.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={getResultClass(game.result)}>
                          {game.result.charAt(0).toUpperCase() + game.result.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button 
                onClick={() => router.push('/game')} 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Play Again
              </button>
              <button 
                onClick={() => router.push('/leaderboard')} 
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                View Leaderboard
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}