import { NextRequest, NextResponse } from 'next/server';

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

export async function GET(request: NextRequest, { params }: { params: { identifier: string } }) {
  const identifier = params.identifier;
  const type = request.nextUrl.searchParams.get('type') || 'hash';

  if (!identifier) {
    return NextResponse.json({ error: 'Invalid identifier' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/cast?identifier=${identifier}&type=${type}`,
      {
        headers: {
          accept: 'application/json',
          api_key: NEYNAR_API_KEY || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cast data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching cast data:', error);
    return NextResponse.json({ error: 'Error fetching cast data' }, { status: 500 });
  }
}
