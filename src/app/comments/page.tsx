'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';
import NotificationBell from '@/components/NotificationBell';


export default function CommentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  //const [comments, setComments] = useState([]);
 //const [comments, setComments] = useState<Comment[]>([]);

type SafeComment = {
  id: string;
  content: string;
  createdAt: string; // ✅ not Date
  authorId: string;
  parentId: string | null;
};

const [comments, setComments] = useState<SafeComment[]>([]);
 
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);
  

useEffect(() => {
  if (session) {
    fetch('/api/comments')
      .then((res) => res.json())
      .then((data) => setComments(data));
  }
}, [session]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Please login to view comments.</p>;

  return (

   <div className="p-4 max-w-2xl mx-auto">
      {/* Logout and Notification */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
        <NotificationBell />
      </div>

      <h1 className="text-2xl font-bold mb-4">Comments</h1>

      <CommentForm
        onSuccess={(newComment) => setComments([newComment, ...comments])}
      />
      <CommentList comments={comments} />
    </div>

    
  );
}


