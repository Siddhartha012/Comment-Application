import CommentItem from './CommentItem';
import { Comment } from '@/types/comment';


type CommentListProps = {
  comments: Comment[];
  onUpdate?: (updated: Comment) => void;
};

export default function CommentList({ comments, onUpdate }: CommentListProps) {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
