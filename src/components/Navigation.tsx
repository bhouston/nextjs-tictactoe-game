'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="bg-white shadow-sm py-3 px-4 mb-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div 
          onClick={() => router.push('/')} 
          className="text-xl font-bold cursor-pointer"
        >
          Tic-Tac-Toe
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/game')}
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive('/game') 
                ? 'bg-blue-600 text-white' 
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            Play Game
          </button>
          
          <button
            onClick={() => router.push('/history')}
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive('/history') 
                ? 'bg-green-600 text-white' 
                : 'text-green-600 hover:bg-green-50'
            }`}
          >
            History
          </button>
          
          <button
            onClick={() => router.push('/leaderboard')}
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive('/leaderboard') 
                ? 'bg-purple-600 text-white' 
                : 'text-purple-600 hover:bg-purple-50'
            }`}
          >
            Leaderboard
          </button>
        </div>
      </div>
    </nav>
  );
}