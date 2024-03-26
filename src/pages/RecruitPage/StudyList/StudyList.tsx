import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import Study from "./Study/Study.tsx";
import { useEffect } from "react";
import { fetchPosts } from "../../../store/posts/posts.slice.ts";

const StudyList = () => {
  const { posts, finishedPosts, recruitingPosts } = useAppSelector(
    (state) => state.posts,
  );

  const { total, recruiting } = useAppSelector((state) => state.postCategories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className={"my-3 mx-2 w-full"}>
      <ul className={"list-none"}>
        {(total ? posts : recruiting ? recruitingPosts : finishedPosts)?.map(
          (post) => <Study key={post.id} post={post} />,
        )}
      </ul>
    </div>
  );
};

export default StudyList;
