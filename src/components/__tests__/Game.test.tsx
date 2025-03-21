import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../Game';
import * as gameUtils from '@/lib/game-utils';

// Mock the game utilities
vi.mock('@/lib/game-utils', async () => {
  const actual = await vi.importActual('@/lib/game-utils');
  return {
    ...actual,
    findBestMove: vi.fn(),
  };
});

describe('Game Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock random to always make user 'X' for consistent tests
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
  });

  it('renders the game board', () => {
    render(<Game />);
    
    // Should display 9 cells
    const cells = screen.getAllByRole('button');
    expect(cells.length).toBe(9);
    
    // Should show player information
    expect(screen.getByText(/You are playing as/)).toBeInTheDocument();
  });

  it('allows player to make a move', () => {
    // Mock the AI to always choose the center
    vi.mocked(gameUtils.findBestMove).mockReturnValue(4);
    
    render(<Game />);
    
    // Click on the first cell
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]);
    
    // The first cell should now have an X
    expect(cells[0].textContent).toBe('X');
    
    // After AI's move, the center should have an O
    expect(cells[4].textContent).toBe('O');
  });

  it('detects when a player wins', async () => {
    // Mock the AI to make predictable moves
    vi.mocked(gameUtils.findBestMove)
      .mockReturnValueOnce(3) // First AI move
      .mockReturnValueOnce(6); // Second AI move
    
    render(<Game />);
    
    const cells = screen.getAllByRole('button');
    
    // Player makes moves to win with a row
    fireEvent.click(cells[0]); // X in top-left
    // AI moves at index 3
    
    fireEvent.click(cells[1]); // X in top-middle
    // AI moves at index 6
    
    fireEvent.click(cells[2]); // X in top-right
    
    // Should show the win message
    expect(screen.getByText(/X wins!/)).toBeInTheDocument();
    
    // Should show play again button
    expect(screen.getByText(/Play Again/)).toBeInTheDocument();
  });

  it('allows starting a new game after completion', () => {
    // Mock the AI to make predictable moves
    vi.mocked(gameUtils.findBestMove)
      .mockReturnValueOnce(3) // First AI move
      .mockReturnValueOnce(6); // Second AI move
    
    render(<Game />);
    
    const cells = screen.getAllByRole('button');
    
    // Player makes moves to win with a row
    fireEvent.click(cells[0]);
    fireEvent.click(cells[1]);
    fireEvent.click(cells[2]);
    
    // Click play again
    fireEvent.click(screen.getByText(/Play Again/));
    
    // Board should be reset
    const newCells = screen.getAllByRole('button');
    newCells.forEach(cell => {
      expect(cell.textContent).toBe('');
    });
    
    // Should be back to playing state
    expect(screen.getByText(/Your turn/)).toBeInTheDocument();
  });
});