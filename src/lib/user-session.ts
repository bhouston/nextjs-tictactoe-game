// Simple client-side session management for the current user
// In a production app, you would use a more robust solution like NextAuth.js

// Save user ID to session storage
export function saveUserSession(userId: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('userId', userId);
  }
}

// Get user ID from session storage
export function getUserSession(): string | null {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('userId');
  }
  return null;
}

// Clear user session
export function clearUserSession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('userId');
  }
}