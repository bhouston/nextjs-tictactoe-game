import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/games - Save a new game result
export async function POST(request: NextRequest) {
  try {
    const { userId, result } = await request.json();
    
    // Validate input
    if (!userId || !result) {
      return NextResponse.json(
        { message: 'User ID and result are required' },
        { status: 400 }
      );
    }
    
    // Validate result value
    if (!['win', 'loss', 'draw'].includes(result)) {
      return NextResponse.json(
        { message: 'Result must be "win", "loss", or "draw"' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create new game record
    const game = await prisma.game.create({
      data: {
        userId,
        result,
      },
    });
    
    return NextResponse.json(
      { 
        message: 'Game result saved successfully', 
        gameId: game.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving game result:', error);
    
    return NextResponse.json(
      { message: 'An error occurred while saving the game result' },
      { status: 500 }
    );
  }
}

// GET /api/games - Get game history for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get all games for the user
    const games = await prisma.game.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    // Calculate stats
    const stats = {
      total: games.length,
      wins: games.filter(game => game.result === 'win').length,
      losses: games.filter(game => game.result === 'loss').length,
      draws: games.filter(game => game.result === 'draw').length,
    };
    
    return NextResponse.json({ games, stats }, { status: 200 });
  } catch (error) {
    console.error('Error fetching game history:', error);
    
    return NextResponse.json(
      { message: 'An error occurred while fetching game history' },
      { status: 500 }
    );
  }
}