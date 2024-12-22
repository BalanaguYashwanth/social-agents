'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import {
  Cast,
  User,
  ReactionType,
  CastWithInteractions,
  Conversation,
} from '@neynar/nodejs-sdk/build/neynar-api/v2';

interface ViewerContext {
  liked: boolean;
  recasted: boolean;
}

interface CastWithReplies extends Omit<Cast, 'author'> {
  author: User;
  reactions: {
    likes: ReactionType[];
    recasts: ReactionType[];
  };
  viewer_context: ViewerContext;
  direct_replies?: CastWithReplies[];
}

interface ConversationResponse {
  conversation: Conversation;
}

interface CastResponse {
  cast: CastWithInteractions;
  conversation: ConversationResponse;
}

async function fetchCastDetailsWithConversation(
  hash: string,
  viewerFid?: number | null
): Promise<CastResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/cast`);
  url.searchParams.append('identifier', hash);
  url.searchParams.append('type', 'hash');
  url.searchParams.append('include_conversation', 'true');
  if (viewerFid) {
    url.searchParams.append('viewer_fid', viewerFid.toString());
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch cast details: ${res.statusText}`);
  }

  return res.json();
}

export function useCastDetailsWithConversation(hash: string) {
  const { user } = usePrivy();

  return useQuery({
    queryKey: ['castDetailsWithConversation', hash, user?.farcaster?.fid],
    queryFn: () => fetchCastDetailsWithConversation(hash, user?.farcaster?.fid),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
