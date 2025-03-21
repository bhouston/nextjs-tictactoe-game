# Tic Tac Toe Game

A modern web application for playing Tic Tac Toe against an AI opponent.

## Tech Stack

- **Frontend**: Next.js with App Router, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Testing**: Vitest with React Testing Library

## Features

- User registration with name and email
- Tic Tac Toe game against a competent AI
- Game result storage (wins, losses, draws)
- Personal game history tracking with statistics
- Leaderboard showing player rankings and win rates
- User identification via email
- Navigation between game, history, and leaderboard

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd tic-tac-toe
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
npx prisma migrate dev --name init
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

Run tests with:
```bash
npm test
```

## Project Structure

- `/src/app` - Next.js app router pages and layouts
  - `/src/app/welcome` - Welcome page with user registration form
  - `/src/app/game` - Game page with the Tic Tac Toe game
  - `/src/app/history` - User's game history and statistics
  - `/src/app/leaderboard` - Leaderboard of all players
  - `/src/app/api` - API routes for data operations
    - `/src/app/api/users` - User registration and management
    - `/src/app/api/games` - Game results and history
    - `/src/app/api/leaderboard` - Leaderboard data
- `/src/components` - React components
  - Game components (Board, Cell, Game)
  - Navigation component
- `/src/lib` - Utility functions and shared logic
  - Game logic and utilities
  - Prisma client setup
  - User session management
- `/prisma` - Database schema and migrations

## Implementation Details

### Welcome Page

The welcome page (`/welcome`) includes:
- A form to collect user name and email
- Client-side validation for required fields and email format
- Server-side validation and error handling
- User creation or update in the database
- Redirect to the game page after successful registration

### Game Page

The game page (`/game`) includes:
- A Tic Tac Toe game board with interactive cells
- Game status display showing current player and game state
- AI opponent with a smart move-finding algorithm
- Random selection of who goes first (X or O)
- Visual indication of winning combinations
- Saving game results to the database when a game ends
- Navigation to play again, view history, or see leaderboard

### History Page

The history page (`/history`) includes:
- Display of the user's game statistics (total games, wins, losses, draws)
- Chronological list of all games played with results and timestamps
- Navigation to play again or view leaderboard
- Automatic redirect to welcome page if not logged in

### Leaderboard Page

The leaderboard page (`/leaderboard`) includes:
- Ranking of all players by number of wins and win rate
- Display of each player's statistics (total games, wins, losses, draws, win rate)
- Visual highlighting of top players
- Navigation to play again or view personal history

## License

MIT