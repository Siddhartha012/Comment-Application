'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/comments');
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  return <p>Redirecting...</p>;
}
