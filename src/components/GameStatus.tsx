import { GameStatus as GameStatusType, Player } from '@/lib/types';

interface GameStatusProps {
  status: GameStatusType;
  currentPlayer: Player;
  winner: Player | null;
  isAITurn: boolean;
}

export default function GameStatus({ status, currentPlayer, winner, isAITurn }: GameStatusProps) {
  return (
    <div className="text-center my-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
      {status === 'playing' && (
        <p className="text-xl">
          {isAITurn 
            ? "AI is thinking..." 
            : `Your turn (${currentPlayer})`}
        </p>
      )}
      
      {status === 'won' && (
        <p className="text-xl font-bold">
          {winner === 'X' ? 'X wins!' : 'O wins!'}
        </p>
      )}
      
      {status === 'draw' && (
        <p className="text-xl font-bold">It's a draw!</p>
      )}
    </div>
  );
}