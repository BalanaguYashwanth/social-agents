import React from 'react';
import HomeScreen from '@/components/home/screen';

interface Cast {
  hash: string;
  text: string;
  timestamp: string;
}

export default function Home() {
  return <HomeScreen />;
}
