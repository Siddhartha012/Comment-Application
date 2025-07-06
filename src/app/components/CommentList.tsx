import CommentItem from './CommentItem';

export default function CommentList({ comments, onUpdate }: any) {
  return (
    <div>
      {comments.map((comment: any) => (
        <CommentItem key={comment.id} comment={comment} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
