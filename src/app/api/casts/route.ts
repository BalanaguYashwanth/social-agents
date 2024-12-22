import { getNeynarClient } from '@/utils/naynar';
import { FilterType } from '@neynar/nodejs-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');
  const fids = JSON.parse(searchParams.get('fids') || '[906065]');
  const numFids = fids.map((fid: any) => parseInt(fid));
  const type = searchParams.get('type') as 'following' | 'filter';
  const cursor = searchParams.get('cursor');
  const viewerFid = searchParams.get('viewerFid');

  if (!fid || !type) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    const client = getNeynarClient();

    let response;
    const commonParams = {
      limit: 10,
      cursor: cursor || undefined,
    };

    if (type === 'filter') {
      response = await client.fetchFeed('filter', {
        ...commonParams,
        fids: numFids as any,
        viewerFid: viewerFid ? parseInt(viewerFid) : undefined,
        filterType: FilterType.Fids,
      });
    }

    if (!response) {
      throw new Error('Invalid feed type');
    }

    const casts = response.casts.map((cast) => ({
      hash: cast.hash,
      text: cast.text,
      parent_hash: cast.parent_hash,
      parent_url: cast.parent_url,
      timestamp: cast.timestamp,
      author: cast.author,
    }));

    return NextResponse.json({
      casts,
      nextCursor: response.next?.cursor,
    });
  } catch (e) {
    console.error('Error fetching casts:', e);
    return NextResponse.json({ error: 'Error fetching user casts' }, { status: 500 });
  }
}
