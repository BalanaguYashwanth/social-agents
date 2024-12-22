import { getNeynarClient } from '@/utils/naynar';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const username = params.username;

  if (!username) {
    return NextResponse.json({ error: 'Invalid Username' }, { status: 400 });
  }

  try {
    const client = getNeynarClient();
    const user = await client.lookupUserByUsername(username);
    const fid = user.result.user.fid;

    const casts = await client.fetchCastsForUser(fid, {
      viewerFid: fid,
      limit: 20,
    });

    return NextResponse.json({ user, casts });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}
