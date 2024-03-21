import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import Study from "./Study/Study.tsx";
import { useEffect } from "react";
import { fetchPosts } from "../../../store/posts/posts.slice.ts";

const StudyList = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  console.log(posts);

  return (
    <div className={"my-3 mx-2 w-full"}>
      <ul className={"list-none"}>
        {posts?.map((post) => <Study key={post.localDateTime} post={post} />)}
      </ul>
    </div>
  );
};

export default StudyList;
