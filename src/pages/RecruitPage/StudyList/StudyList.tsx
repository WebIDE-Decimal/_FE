import { useAppSelector } from "../../../hooks/redux.ts";
import Study from "./Study/Study.tsx";
import { Link } from "react-router-dom";

const StudyList = () => {
  const { posts } = useAppSelector((state) => state.posts);

  return (
    <div className={"my-3 mx-2 w-full"}>
      <ul
        className={
          "list-none flex flex-col w-full overflow-y-auto max-h-[470px] hide-scrollbar"
        }
      >
        {posts?.map((post) => (
          <Link key={post.id} to={`../../../post/${post.id}`}>
            <Study post={post} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default StudyList;
