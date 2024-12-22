'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CastList from '@/components/home/screen-cast-list';
import Image from 'next/image';
import WalletConnect from '@/components/wallet-connect/wallet-connect';
import { usePrivy } from '@privy-io/react-auth';

const ProfilePage = () => {
  const { user } = usePrivy();
  const url = usePathname();
  const username = url?.split('/').pop();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        try {
          const response = await fetch(`/api/user/${username}`);
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
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (!userData || !userData.user) return <div>User not found</div>;

  const { user: userProfile, casts: castsData } = userData;

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
            <WalletConnect
              ownerFid={userProfile?.result?.user?.fid}
              userFid={user?.farcaster?.fid}
              username={userProfile?.result?.user?.username}
            />
          </div>
        </div>
        <p className="text-gray-700">{userProfile.profile?.bio?.text || ''}</p>
        <div className="mt-4 flex space-x-4">
          <span>{userProfile.result.user.followerCount} followers</span>
          <span>{userProfile.result.user.followingCount} following</span>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Recent Casts</h2>
      <CastList casts={castsData.casts} tabType="filter" />
    </div>
  );
};

export default ProfilePage;
