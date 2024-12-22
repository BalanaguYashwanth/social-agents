import React from 'react';
import Link from 'next/link';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import CastCard from '@/components/home/casts/cast-card';

type TabType = 'following' | 'filter';

interface CastListProps {
  casts: Cast[];
  tabType: TabType;
}

const CastList: React.FC<CastListProps> = ({ casts, tabType }) =>
  casts.length > 0 ? (
    <ul>
      {casts.map((cast) => (
        <Link href={`/cast/${cast.hash}`} key={cast.hash}>
          <li className="border-b min-w-full border-gray-200 bg-white cursor-pointer">
            {cast.parent_hash && (
              <CastCard
                castData={{
                  hash: cast.parent_hash,
                  parent_hash: null,
                  parent_url: cast.parent_url,
                  timestamp: cast.timestamp,
                  author: cast.author,
                }}
                isParent={true}
              />
            )}{' '}
            <CastCard
              castData={{
                hash: cast.hash,
                parent_hash: cast.parent_hash,
                parent_url: cast.parent_url,
                timestamp: cast.timestamp,
                author: cast.author,
              }}
            />
          </li>
        </Link>
      ))}
    </ul>
  ) : (
    <p>No casts found in {tabType === 'following' ? 'Following' : 'Trending'}.</p>
  );

export default CastList;
