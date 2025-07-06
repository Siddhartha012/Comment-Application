
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/comments',
    });
  if (res?.ok) {
    router.push('/comments');
  } else {
    setError('Invalid credentials');
  }

  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        className="border p-2 w-full mb-2"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        className="border p-2 w-full mb-4"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </div>
  );
}
