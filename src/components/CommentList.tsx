import CommentItem from './CommentItem';
import { Comment } from '@/types/comment';

export default function CommentList({ comments, onUpdate }: Comment) {
  return (
    <div>
      {comments.map((comment: Comment) => (
        <CommentItem key={comment.id} comment={comment} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
