import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();
    
    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    let user;
    
    if (existingUser) {
      // If the user exists but with a different name, update the name
      if (existingUser.name !== name) {
        user = await prisma.user.update({
          where: { email },
          data: { name },
        });
      } else {
        user = existingUser;
      }
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
    }
    
    return NextResponse.json(
      { 
        message: 'User registered successfully', 
        userId: user.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing user registration:', error);
    
    // Handle duplicate email error specifically
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json(
        { message: 'This email is already registered' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}