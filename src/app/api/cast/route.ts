import { getNeynarClient } from '@/utils/naynar';
import { CastParamType } from '@neynar/nodejs-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('api is hit');
  const { searchParams } = new URL(request.url);
  const identifier = searchParams.get('identifier');

  const type: CastParamType = searchParams.get('type') as CastParamType;
  const viewerFid = parseInt(searchParams.get('viewer_fid') as string) || undefined;
  const includeConversation = searchParams.get('include_conversation') === 'true';

  if (!identifier || !type) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const client = getNeynarClient();
    const castResponse = await client.lookUpCastByHashOrWarpcastUrl(identifier, type, {
      viewerFid,
    });

    let conversationResponse;
    if (includeConversation) {
      conversationResponse = await client.lookupCastConversation(identifier, type, {
        replyDepth: 1,
        viewerFid: viewerFid,
        includeChronologicalParentCasts: true,
        limit: 20,
      });
    }

    const response = {
      cast: castResponse.cast,
      conversation: includeConversation ? conversationResponse : null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching cast conversation:', error);
    return NextResponse.json({ error: 'Error fetching cast conversation' }, { status: 500 });
  }
}
