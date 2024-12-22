'use client';

import { useQuery } from '@tanstack/react-query';
import { CastWithInteractions, User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { usePrivy } from '@privy-io/react-auth';

interface ExtendedCastWithInteractions extends CastWithInteractions {
  author: User;
  viewer_context: {
    liked: boolean;
    recasted: boolean;
  };
}

interface ConversationResponse {
  conversation: {
    cast: ExtendedCastWithInteractions;
  };
  next?: {
    cursor: string;
  };
}

interface CastResponse {
  cast: ExtendedCastWithInteractions;
  conversation: ConversationResponse;
}

export const fetchCastDetails = async (
  hash: string,
  viewerFid?: number | null
): Promise<CastResponse> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/cast`);
  url.searchParams.append('identifier', hash);
  url.searchParams.append('type', 'hash');
  if (viewerFid) {
    url.searchParams.append('viewer_fid', viewerFid.toString());
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const useFetchCastDetails = (hash: string, fid?: number | null) => {
  return useQuery({
    queryKey: ['cast', hash, fid],
    queryFn: () => fetchCastDetails(hash, fid),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
