'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CastCard from '@/components/home/casts/cast-card';
import { usePathname } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { useFetchUserFeed } from '@/hooks/api/feed/useFetchUserFeed';
import CastList from '@/components/home/screen-cast-list';

const ProfilePage = () => {
  const url = usePathname();
  const fid = url?.split('/').pop();
  const { user } = usePrivy();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { castsData, error, fetchMoreCasts } = useFetchUserFeed(user?.farcaster?.fid ?? undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      if (fid) {
        try {
          const response = await fetch(`/api/user/${fid}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [fid]);

  if (loading) return <div>Loading...</div>;
  if (!userData || !userData.user) return <div>User not found</div>;

  const { user: userProfile, casts } = userData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <Image
            src={userProfile.result.user.pfp.url || '/default-avatar.png'}
            alt={userProfile.result.user.displayName}
            width={80}
            height={80}
            className="rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold">{userProfile.result.user.displayName}</h1>
            <p className="text-gray-600">@{userProfile.result.user.username}</p>
          </div>
        </div>
        <p className="text-gray-700">{userProfile.profile?.bio?.text || 'No bio available'}</p>
        <div className="mt-4 flex space-x-4">
          <span>{userProfile.result.user.followerCount} followers</span>
          <span>{userProfile.result.user.followingCount} following</span>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Recent Casts</h2>
      <CastList casts={castsData.following.casts} tabType="following" />

      <div className="space-y-4"></div>
    </div>
  );
};

export default ProfilePage;
