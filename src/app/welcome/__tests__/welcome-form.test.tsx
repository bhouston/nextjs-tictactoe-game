import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WelcomeForm from '../welcome-form';

// Mock the Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the fetch function
global.fetch = vi.fn();

describe('WelcomeForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<WelcomeForm />);
    
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start playing/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<WelcomeForm />);
    
    // Submit the form without filling in any fields
    fireEvent.click(screen.getByRole('button', { name: /start playing/i }));
    
    // Check if validation errors are displayed
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    render(<WelcomeForm />);
    
    // Fill in name but provide invalid email
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalid-email' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /start playing/i }));
    
    // Check if email validation error is displayed
    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    // Mock successful fetch response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'User registered successfully', userId: '123' }),
    });
    
    render(<WelcomeForm />);
    
    // Fill in valid form data
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /start playing/i }));
    
    // Verify that fetch was called with the correct arguments
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Test User', email: 'test@example.com' }),
      });
    });
  });
});