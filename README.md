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
- Game history tracking
- Leaderboard showing player rankings
- User identification via email

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
- `/src/components` - React components
- `/src/lib` - Utility functions and shared logic
- `/prisma` - Database schema and migrations

## License

MIT