'use client';
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from './button';

const SignInButton: React.FC = () => {
  const { login } = usePrivy();

  return (
    <Button
      onClick={() => {
        alert('Sign in with Farcaster');
        login();
      }}
    >
      Sign In with Farcaster
    </Button>
  );
};

export default SignInButton;
