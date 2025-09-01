import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();
    
    // Revalidate the specified path
    await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return NextResponse.json({ revalidated: true, path });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
