'use client';

import SignInButton from '../ui/navbar-button';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-red-500 w-full h-screen flex flex0-col gap-1 items-center justify-center">
    <p>{message}</p>
    <SignInButton />
  </div>
);

export default ErrorMessage;
