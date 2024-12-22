import React from 'react';
import { notFound } from 'next/navigation';
import CastCard from '@/components/home/casts/cast-card';
import ErrorMessage from '@/components/home/errormessage';
import CastDetailsCard from '@/components/cast-details/cast-details-card';

interface CastDetailsPageProps {
  params: {
    hash: string;
  };
}

async function fetchCastDetails(hash: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/cast`);
  url.searchParams.append('identifier', hash);
  url.searchParams.append('type', 'hash');

  const response = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export default async function CastDetailsPage({ params }: CastDetailsPageProps) {
  try {
    const data = await fetchCastDetails(params.hash);

    if (!data || !data.cast) {
      notFound();
    }

    const hasParent = data.cast.parent_hash !== null;

    return (
      <div className="pt-2">
        {hasParent && (
          <CastCard
            castData={{
              hash: data.cast.parent_hash as string,
              parent_hash: null,
              parent_url: data.cast.parent_url,
              timestamp: data.cast.timestamp,
              author: data.cast.author,
            }}
            isParent={true}
          />
        )}
        <CastDetailsCard castHash={data.cast.hash} />
      </div>
    );
  } catch (error) {
    return <ErrorMessage message="Failed to load cast details" />;
  }
}
