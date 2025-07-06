'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';

export default function CommentsPage() {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('/api/comments')
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Please login to view comments.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      <CommentForm onSuccess={(newComment) => setComments([newComment, ...comments])} />
      <CommentList comments={comments} />
    </div>
  );
}
