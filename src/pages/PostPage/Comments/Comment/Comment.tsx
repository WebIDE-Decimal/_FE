import { v4 } from "uuid";
import { useAppSelector } from "../../../../hooks/redux";
import defaultImg from "../../../../assets/user.png";

const Comment = () => {
  const comments = useAppSelector((state) => state.comments);
  console.log(comments);
  return (
    <div className="pt-2">
      {comments?.map((comment) => (
        <li
          key={v4()}
          className="border-b items-center flex px-4 py-2 border-gray/70"
        >
          <img src={defaultImg} className={"w-12 h-12 mr-2"} />
          <div className={"ml-1"}>
            <p className="text-white font-semibold">{comment.author}</p>
            <p className="text-white font-light">{comment.comment}</p>
          </div>
        </li>
      ))}
    </div>
  );
};

export default Comment;
