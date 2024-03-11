import { v4 } from "uuid";
import { useAppSelector } from "../../../../hooks/redux";

const Comment = () => {
  const comments = useAppSelector((state) => state.comments);
  console.log(comments);
  return (
    <>
      {comments?.map((comment) => (
        <div key={v4()}>
          <p>{comment.author}</p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </>
  );
};

export default Comment;
