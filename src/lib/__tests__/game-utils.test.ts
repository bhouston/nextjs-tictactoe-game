import { describe, expect, it } from 'vitest';
import {
  checkWinner,
  createEmptyBoard,
  findBestMove,
  getAvailableMoves,
  isBoardFull,
  makeMove,
  switchPlayer,
} from '../game-utils';
import { Board } from '../types';

describe('Game Utilities', () => {
  describe('createEmptyBoard', () => {
    it('should create an empty board with 9 null cells', () => {
      const board = createEmptyBoard();
      expect(board.length).toBe(9);
      expect(board.every(cell => cell === null)).toBe(true);
    });
  });

  describe('checkWinner', () => {
    it('should return null for an empty board', () => {
      const board = createEmptyBoard();
      expect(checkWinner(board)).toBeNull();
    });

    it('should detect a row win', () => {
      const board: Board = [
        'X', 'X', 'X',
        null, 'O', 'O',
        null, null, null
      ];
      expect(checkWinner(board)).toBe('X');
    });

    it('should detect a column win', () => {
      const board: Board = [
        'O', 'X', null,
        'O', 'X', null,
        'O', null, null
      ];
      expect(checkWinner(board)).toBe('O');
    });

    it('should detect a diagonal win', () => {
      const board: Board = [
        'X', 'O', null,
        'O', 'X', null,
        null, 'O', 'X'
      ];
      expect(checkWinner(board)).toBe('X');
    });

    it('should return null if no winner', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', 'O'
      ];
      expect(checkWinner(board)).toBeNull();
    });
  });

  describe('isBoardFull', () => {
    it('should return true for a full board', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', 'O'
      ];
      expect(isBoardFull(board)).toBe(true);
    });

    it('should return false for a partially filled board', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', null
      ];
      expect(isBoardFull(board)).toBe(false);
    });

    it('should return false for an empty board', () => {
      const board = createEmptyBoard();
      expect(isBoardFull(board)).toBe(false);
    });
  });

  describe('getAvailableMoves', () => {
    it('should return all indices for an empty board', () => {
      const board = createEmptyBoard();
      expect(getAvailableMoves(board)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should return only empty cell indices', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', null, 'O',
        null, 'X', null
      ];
      expect(getAvailableMoves(board)).toEqual([4, 6, 8]);
    });

    it('should return an empty array for a full board', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', 'O'
      ];
      expect(getAvailableMoves(board)).toEqual([]);
    });
  });

  describe('makeMove', () => {
    it('should place a mark at the specified index', () => {
      const board = createEmptyBoard();
      const newBoard = makeMove(board, 4, 'X');
      expect(newBoard[4]).toBe('X');
    });

    it('should not modify the original board', () => {
      const board = createEmptyBoard();
      const newBoard = makeMove(board, 4, 'X');
      expect(board[4]).toBeNull();
      expect(newBoard).not.toBe(board);
    });

    it('should not modify the board if the cell is already taken', () => {
      const board: Board = [
        null, null, null,
        null, 'X', null,
        null, null, null
      ];
      const newBoard = makeMove(board, 4, 'O');
      expect(newBoard[4]).toBe('X');
    });
  });

  describe('switchPlayer', () => {
    it('should switch from X to O', () => {
      expect(switchPlayer('X')).toBe('O');
    });

    it('should switch from O to X', () => {
      expect(switchPlayer('O')).toBe('X');
    });
  });

  describe('findBestMove', () => {
    it('should find a winning move', () => {
      const board: Board = [
        'X', 'X', null,
        'O', 'O', null,
        null, null, null
      ];
      expect(findBestMove(board, 'X')).toBe(2); // Complete the row
    });

    it('should block opponent from winning', () => {
      const board: Board = [
        'X', 'X', null,
        'O', 'O', null,
        null, null, null
      ];
      expect(findBestMove(board, 'O')).toBe(2); // Block X from winning
    });

    it('should take the center if available', () => {
      const board: Board = [
        'X', null, null,
        null, null, null,
        null, null, 'O'
      ];
      expect(findBestMove(board, 'O')).toBe(4); // Take center
    });
  });
});