import { useState, useEffect } from 'react';

interface CastId {
  fid: number;
  hash: string;
}

export const useRecastData = (castId: CastId) => {
  const [recastData, setRecastData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecastData = async () => {
      try {
        const response = await fetch(`/api/recast/${castId.hash}?type=hash`);
        if (!response.ok) {
          throw new Error('Failed to fetch recast data');
        }
        const data = await response.json();
        setRecastData(data.cast);
      } catch (error) {
        console.error('Error fetching recast data:', error);
        setError('Failed to load recast');
      } finally {
        setLoading(false);
      }
    };

    fetchRecastData();
  }, [castId.hash]);

  return { recastData, loading, error };
};
