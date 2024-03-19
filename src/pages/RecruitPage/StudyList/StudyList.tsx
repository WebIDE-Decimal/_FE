import { useAppSelector } from "../../../hooks/redux.ts";
import Study from "./Study/Study.tsx";

const StudyList = () => {
  const { posts } = useAppSelector((state) => state.posts);
  console.log(posts);
  return (
    <div className={"my-3 mx-2 w-full"}>
      <ul className={"list-none"}>
        {posts?.map((post) => <Study key={post.id} post={post} />)}
      </ul>
    </div>
  );
};

export default StudyList;
