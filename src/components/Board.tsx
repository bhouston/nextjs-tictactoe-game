import { Board as BoardType, Player } from '@/lib/types';
import Cell from './Cell';
import { WINNING_COMBINATIONS } from '@/lib/game-utils';

interface BoardProps {
  board: BoardType;
  onCellClick: (index: number) => void;
  disabled: boolean;
  winningCombo: number[] | null;
}

export default function Board({ board, onCellClick, disabled, winningCombo }: BoardProps) {
  const isWinningCell = (index: number): boolean => {
    if (!winningCombo) return false;
    return winningCombo.includes(index);
  };

  return (
    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
          winningCell={isWinningCell(index)}
        />
      ))}
    </div>
  );
}