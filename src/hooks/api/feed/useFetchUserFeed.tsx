import { useQueries, useQueryClient } from '@tanstack/react-query';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';

type TabType = 'following' | 'filter';

interface CastData {
  casts: Cast[];
  nextCursor: string | null;
}

interface FetchCastsParams {
  fid: number | undefined;
  type: TabType;
  cursor?: string;
}

const fetchCasts = async ({ fid, type, cursor }: FetchCastsParams): Promise<CastData> => {
  const response = await fetch(
    `/api/casts?fid=${fid}&type=${type}${cursor ? `&cursor=${cursor}` : ''}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch casts');
  }

  return response.json();
};

export const useFetchUserFeed = (fid: number | undefined) => {
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: ['following', 'filter'].map((type) => ({
      queryKey: ['casts', fid, type],
      queryFn: () => fetchCasts({ fid: fid!, type: type as TabType }),
      enabled: !!fid,
      staleTime: Infinity,
      placeholderData: (previousData: CastData | undefined) => previousData,
    })),
  });

  const [followingQuery, filterQuery] = queries;

  const fetchMoreCasts = async (type: TabType) => {
    const currentData = queryClient.getQueryData<CastData>(['casts', fid, type]);
    if (currentData?.nextCursor) {
      const newData = await fetchCasts({
        fid: fid!,
        type,
        cursor: currentData.nextCursor,
      });
      queryClient.setQueryData(['casts', fid, type], {
        casts: [...currentData.casts, ...newData.casts],
        nextCursor: newData.nextCursor,
      });
    }
  };

  return {
    castsData: {
      following: followingQuery.data ?? { casts: [], nextCursor: null },
      filter: filterQuery.data ?? { casts: [], nextCursor: null },
    },
    loading: followingQuery.isLoading || filterQuery.isLoading,
    error: followingQuery.error || filterQuery.error,
    fetchMoreCasts,
  };
};
