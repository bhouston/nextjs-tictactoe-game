'use client';

import Game from '@/components/Game';
import Navigation from '@/components/Navigation';

export default function GamePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-6">Tic-Tac-Toe Game</h1>
        <Game />
      </div>
    </div>
  );
}