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
  fids?: any;
}

const fetchCasts = async ({ fid, fids, type, cursor }: FetchCastsParams): Promise<CastData> => {
  const stringifiedFids = JSON.stringify(fids);
  const response = await fetch(
    `/api/casts?fid=${fid}&fids=${stringifiedFids}&type=${type}${cursor ? `&cursor=${cursor}` : ''}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch casts');
  }

  return response.json();
};

export const useFetchUserFeed = (fid: number | undefined, fids?: any) => {
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: ['casts', fid, 'filter'],
        queryFn: () => fetchCasts({ fid: fid!, fids, type: 'filter' as TabType }),
        enabled: !!fid,
        staleTime: Infinity,
        placeholderData: (previousData: CastData | undefined) => previousData,
      },
    ],
  });

  const [filterQuery] = queries;

  const fetchMoreCasts = async (type: TabType) => {
    const currentData = queryClient.getQueryData<CastData>(['casts', fid, type]);
    if (currentData?.nextCursor) {
      const newData = await fetchCasts({
        fid: fid!,
        fids,
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
    castsData: filterQuery.data ?? { casts: [], nextCursor: null },
    loading: filterQuery.isLoading || filterQuery.isLoading,
    error: filterQuery.error || filterQuery.error,
    fetchMoreCasts,
  };
};
