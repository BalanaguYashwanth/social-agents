import { getNeynarClient } from '@/utils/naynar';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { fid: string } }) {
  const fid = params.fid;

  if (!fid) {
    return NextResponse.json({ error: 'Invalid FID' }, { status: 400 });
  }

  try {
    const client = getNeynarClient();
    const user = await client.lookupUserByFid(parseInt(fid));
    const casts = await client.fetchCastsForUser(parseInt(fid), {
      viewerFid: parseInt(fid),
      limit: 20,
    });

    return NextResponse.json({ user, casts });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}
