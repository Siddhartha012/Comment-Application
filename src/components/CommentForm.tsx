
'use client';

import { useState, useEffect } from 'react';

interface CommentFormProps {
  parentId?: string | null;
  onSuccess: (comment: any) => void;
  initialContent?: string;
  commentId?: string;
  mode?: 'create' | 'edit';
  onCancelEdit?: () => void;
}

export default function CommentForm({
  parentId = null,
  onSuccess,
  initialContent = '',
  commentId,
  mode = 'create',
  onCancelEdit,
}: CommentFormProps) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent); // update if props change
  }, [initialContent]);

  const submitComment = async () => {
    if (!content.trim()) return;

    const body = mode === 'edit'
  ? JSON.stringify({ content })             // Only content for edit
  : JSON.stringify({ content, parentId });

    const res = await fetch(
      mode === 'edit' && commentId
        ? `/api/comments/${commentId}/edit`
        : '/api/comments',
      {
        method: mode === 'edit' ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        
      }
    );

    if (res.ok) {
      const comment = await res.json();
      onSuccess(comment);
      setContent('');
    }
  };

  return (
    <div className="mb-4">
      <textarea
        className="border p-2 w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
      />
      <div className="mt-2 flex gap-2">
        <button className="bg-green-500 text-white px-4 py-1" onClick={submitComment}>
          {mode === 'edit' ? 'Update' : 'Submit'}
        </button>
        {mode === 'edit' && onCancelEdit && (
          <button className="text-gray-600 text-sm" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
