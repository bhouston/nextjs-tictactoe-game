import Game from '@/components/Game';

export default function GamePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Tic-Tac-Toe Game</h1>
      <Game />
    </div>
  );
}