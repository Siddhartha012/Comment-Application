
'use client';

import { useState } from 'react';
import CommentForm from './CommentForm';
import { Comment } from '@/types/comment';

type CommentItemProps = {
  comment: Comment;
  onUpdate?: (updated: Comment) => void;
};

export default function CommentItem({ comment }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  const [isDeleted, setIsDeleted] = useState(!!comment.deletedAt);
  const [localContent, setLocalContent] = useState(comment.content);


  const handleDelete = async () => {
    const res = await fetch(`/api/comments/${comment.id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setIsDeleted(true);
    }
  };

  const handleRestore = async () => {
    const res = await fetch(`/api/comments/${comment.id}/restore`, {
      method: 'PATCH',
    });
    if (res.ok) {
      const data = await res.json();
      setIsDeleted(false);
      setLocalContent(data.content); // restore original content
    }
  };

  return (
    <div className="border p-2 mb-2 ml-4">
      <p className="text-sm text-gray-400">
        <strong>{comment.author.name}</strong> ({new Date(comment.createdAt).toLocaleString()})
      </p>

      {!isDeleted && !isEditing && (
        <p>{localContent}</p>
      )}

      {isEditing && (
        <CommentForm
          mode="edit"
          commentId={comment.id}
          initialContent={localContent}
          onSuccess={(updated) => {
            setLocalContent(updated.content);
            setIsEditing(false);
          }}
          onCancelEdit={() => setIsEditing(false)}
        />
      )}

      {isDeleted && (
        <p className="italic text-gray-500">This comment was deleted.</p>
      )}

      <div className="flex gap-3 mt-1 text-sm">
        {!isDeleted && !isEditing && (
          <>
            <button onClick={() => setShowReply(!showReply)} className="text-blue-600">
              Reply
            </button>
            <button onClick={() => setIsEditing(true)} className="text-yellow-500">
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-500">
              Delete
            </button>
          </>
        )}

        {isDeleted && (
          <button onClick={handleRestore} className="text-green-500">
            Restore
          </button>
        )}
      </div>

      {showReply && (
        <CommentForm
          parentId={comment.id}
          onSuccess={(reply: Comment) => {
            setReplies([reply, ...replies]);
            setShowReply(false);
          }}
        />
      )}

      {replies.length > 0 &&
        replies.map((r: Comment) => (
          <CommentItem key={r.id} comment={r} />
        ))}
    </div>
  );
}
