import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { addComment } from "../../../store/posts/comments/comments";
import Comment from "./Comment/Comment";

const Comments = () => {
  const comments = useAppSelector((state) => state.comments);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const handleCommentButton = (e) => {
    e.preventDefault();
    const newComment = {
      author: "개똥이",
      comment,
    };
    dispatch(addComment(newComment));
  };

  return (
    <div>
      <div className="mt-2">
        <p className="font-semibold text-2xl text-white">댓글</p>
      </div>
      <ul>{comments.length ? <Comment /> : null}</ul>
      <form className="mt-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="resize-none w-full h-40 rounded-lg p-2"
          placeholder="코멘트를 작성하세요."
        />
        <div>
          <button
            onClick={handleCommentButton}
            className="bg-gray/90 mt-2 rounded-lg float-end px-3 py-2 hover:text-white hover:bg-gray text-white/70 font-semibold text-lg"
          >
            댓글쓰기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
