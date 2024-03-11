import { v4 } from "uuid";
import { useAppSelector } from "../../../../hooks/redux";

const Comment = () => {
  const comments = useAppSelector((state) => state.comments);
  console.log(comments);
  return (
    <div className="pt-2">
      {comments?.map((comment) => (
        <li key={v4()} className="border-b px-4 py-1 border-gray/70">
          <p className="text-white font-semibold">{comment.author}</p>
          <p className="text-white font-light">{comment.comment}</p>
        </li>
      ))}
    </div>
  );
};

export default Comment;
