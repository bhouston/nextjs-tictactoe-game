import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get all users with their games
    const users = await prisma.user.findMany({
      include: {
        games: true,
      },
    });
    
    // Calculate stats for each user and format for leaderboard
    const leaderboard = users.map(user => {
      const totalGames = user.games.length;
      const wins = user.games.filter(game => game.result === 'win').length;
      const losses = user.games.filter(game => game.result === 'loss').length;
      const draws = user.games.filter(game => game.result === 'draw').length;
      
      return {
        id: user.id,
        name: user.name,
        totalGames,
        wins,
        losses,
        draws,
        winRate: totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0,
      };
    });
    
    // Sort by wins (descending), then by win rate (descending)
    leaderboard.sort((a, b) => {
      if (a.wins !== b.wins) return b.wins - a.wins;
      return b.winRate - a.winRate;
    });
    
    return NextResponse.json({ leaderboard }, { status: 200 });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    
    return NextResponse.json(
      { message: 'An error occurred while fetching the leaderboard' },
      { status: 500 }
    );
  }
}