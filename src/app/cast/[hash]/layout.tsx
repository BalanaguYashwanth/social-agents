import { ReactNode } from 'react';

export default function CastLayout({ children }: { children: ReactNode }) {
  return <div className="pt-1">{children}</div>;
}
