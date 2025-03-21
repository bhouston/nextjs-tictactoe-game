'use client';

import { useEffect, useState } from 'react';
import { Board as BoardType, GameState, Player } from '@/lib/types';
import Board from './Board';
import GameStatus from './GameStatus';
import { 
  WINNING_COMBINATIONS,
  checkWinner, 
  createEmptyBoard, 
  findBestMove, 
  isBoardFull, 
  makeMove, 
  switchPlayer
} from '@/lib/game-utils';

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Randomly decide who goes first
    const userPlayer = Math.random() < 0.5 ? 'X' : 'O';
    const aiPlayer = userPlayer === 'X' ? 'O' : 'X';
    const isAIFirst = aiPlayer === 'X';

    return {
      board: createEmptyBoard(),
      currentPlayer: 'X', // X always starts
      status: 'playing',
      winner: null,
      isAITurn: isAIFirst,
    };
  });

  const [userPlayer, setUserPlayer] = useState<Player>(() => 
    gameState.isAITurn ? 'O' : 'X'
  );
  
  const [aiPlayer, setAiPlayer] = useState<Player>(() => 
    userPlayer === 'X' ? 'O' : 'X'
  );

  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);

  // Handle AI moves
  useEffect(() => {
    if (gameState.status !== 'playing' || !gameState.isAITurn) {
      return;
    }

    // Add a small delay to make it seem like the AI is "thinking"
    const timer = setTimeout(() => {
      const moveIndex = findBestMove(gameState.board, aiPlayer);
      handleMove(moveIndex);
    }, 500);

    return () => clearTimeout(timer);
  }, [gameState.isAITurn, gameState.status]);

  // Handle player or AI move
  const handleMove = (index: number) => {
    if (
      gameState.status !== 'playing' || 
      gameState.board[index] !== null
    ) {
      return;
    }

    const newBoard = makeMove(gameState.board, index, gameState.currentPlayer);
    const winner = checkWinner(newBoard);

    if (winner) {
      // Find the winning combination
      const winCombo = WINNING_COMBINATIONS.find(combo => {
        const [a, b, c] = combo;
        return (
          newBoard[a] === winner && 
          newBoard[b] === winner && 
          newBoard[c] === winner
        );
      }) || null;

      setWinningCombo(winCombo);

      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: 'won',
        winner,
        isAITurn: false,
      });
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: 'draw',
        winner: null,
        isAITurn: false,
      });
      return;
    }

    const nextPlayer = switchPlayer(gameState.currentPlayer);
    setGameState({
      board: newBoard,
      currentPlayer: nextPlayer,
      status: 'playing',
      winner: null,
      isAITurn: nextPlayer === aiPlayer,
    });
  };

  // Handle user cell click
  const handleCellClick = (index: number) => {
    if (gameState.isAITurn || gameState.status !== 'playing') {
      return;
    }
    handleMove(index);
  };

  // Reset the game
  const resetGame = () => {
    // Randomly decide who goes first in the new game
    const newUserPlayer = Math.random() < 0.5 ? 'X' : 'O';
    const newAiPlayer = newUserPlayer === 'X' ? 'O' : 'X';
    const isAIFirst = newAiPlayer === 'X';

    setUserPlayer(newUserPlayer);
    setAiPlayer(newAiPlayer);
    setWinningCombo(null);
    
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: 'X', // X always starts
      status: 'playing',
      winner: null,
      isAITurn: isAIFirst,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <p className="text-center mb-2">
          You are playing as <span className="font-bold">{userPlayer}</span>
        </p>
        <GameStatus 
          status={gameState.status}
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          isAITurn={gameState.isAITurn}
        />
      </div>
      
      <Board 
        board={gameState.board}
        onCellClick={handleCellClick}
        disabled={gameState.isAITurn || gameState.status !== 'playing'}
        winningCombo={winningCombo}
      />
      
      {(gameState.status === 'won' || gameState.status === 'draw') && (
        <button
          onClick={resetGame}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Play Again
        </button>
      )}
    </div>
  );
}