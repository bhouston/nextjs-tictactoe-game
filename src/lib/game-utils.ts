import { Board, CellValue, Player } from './types';

// Winning combinations (rows, columns, diagonals)
export const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

// Create an empty board
export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}

// Check if there's a winner
export function checkWinner(board: Board): Player | null {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }
  return null;
}

// Check if the board is full (draw)
export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

// Get available moves (empty cells)
export function getAvailableMoves(board: Board): number[] {
  return board.reduce<number[]>((moves, cell, index) => {
    if (cell === null) {
      moves.push(index);
    }
    return moves;
  }, []);
}

// Make a move on the board
export function makeMove(board: Board, index: number, player: Player): Board {
  if (board[index] !== null) {
    return board; // Cell already taken
  }
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
}

// Switch player
export function switchPlayer(player: Player): Player {
  return player === 'X' ? 'O' : 'X';
}

// AI move implementation using minimax algorithm
export function findBestMove(board: Board, aiPlayer: Player): number {
  const humanPlayer = switchPlayer(aiPlayer);
  const availableMoves = getAvailableMoves(board);
  
  // If there's only one move available, take it
  if (availableMoves.length === 1) {
    return availableMoves[0];
  }
  
  // Try to win if possible in one move
  for (const move of availableMoves) {
    const newBoard = makeMove(board, move, aiPlayer);
    if (checkWinner(newBoard) === aiPlayer) {
      return move;
    }
  }
  
  // Block opponent if they can win in one move
  for (const move of availableMoves) {
    const newBoard = makeMove(board, move, humanPlayer);
    if (checkWinner(newBoard) === humanPlayer) {
      return move;
    }
  }
  
  // Take center if available
  if (board[4] === null) {
    return 4;
  }
  
  // Take corners if available
  const corners = [0, 2, 6, 8].filter(corner => board[corner] === null);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }
  
  // Take any available edge
  const edges = [1, 3, 5, 7].filter(edge => board[edge] === null);
  if (edges.length > 0) {
    return edges[Math.floor(Math.random() * edges.length)];
  }
  
  // Fallback: take any available move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Full minimax algorithm for harder difficulty (optional enhancement)
export function minimaxScore(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  humanPlayer: Player
): number {
  const winner = checkWinner(board);
  
  // Terminal states
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (isBoardFull(board)) return 0;
  
  const availableMoves = getAvailableMoves(board);
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, aiPlayer);
      const score = minimaxScore(newBoard, depth + 1, false, aiPlayer, humanPlayer);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, humanPlayer);
      const score = minimaxScore(newBoard, depth + 1, true, aiPlayer, humanPlayer);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}