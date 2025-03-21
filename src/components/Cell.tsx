import { CellValue } from '@/lib/types';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  disabled: boolean;
  winningCell?: boolean;
}

export default function Cell({ value, onClick, disabled, winningCell = false }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-24 h-24 border-2 text-4xl font-bold flex items-center justify-center transition-colors
        ${disabled && !value ? 'cursor-not-allowed' : value ? 'cursor-default' : 'cursor-pointer'}
        ${winningCell ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}
        ${value === 'X' ? 'text-blue-600 dark:text-blue-400' : value === 'O' ? 'text-red-600 dark:text-red-400' : ''}`}
      aria-label={value ? `Cell with ${value}` : 'Empty cell'}
    >
      {value}
    </button>
  );
}