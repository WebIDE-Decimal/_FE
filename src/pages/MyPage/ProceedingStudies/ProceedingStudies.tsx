import ProceedingStudy from "./ProceedingStudy/ProceedingStudy.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../../store/posts/posts.slice.ts";
import api from "../../../api";
import { Post } from "../../../store/posts/post.type.ts";

const ProceedingStudies = () => {
  const [proceedingStudies, setProceedingStudies] = useState([]);

  useEffect(() => {
    const myPost = async () => {
      try {
        const myPostResponse = await api.get(`/recruit/myPost`);
        const filteredMyPosts = myPostResponse.data.filter(
          (post: Post) => !post.state,
        );
        const myApplyResponse = await api.get("/recruitInfo/myApply");
        console.log(myApplyResponse);
        const filteredMyApplies = myApplyResponse.data.filter(
          (post: Post) => post.myState === "APPROVE" && !post.state,
        );
        setProceedingStudies(filteredMyPosts.concat(filteredMyApplies));
      } catch (err) {
        console.log(err);
      }
    };

    myPost();
  }, []);

  return (
    <div className={"w-full flex mt-12"}>
      <ul
        className={
          "flex w-full px-4 h-full flex-wrap overflow-y-auto max-h-[500px] hide-scrollbar"
        }
      >
        {proceedingStudies?.length !== 0 &&
          proceedingStudies
            .sort(
              (a: Post, b: Post) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((study: Post) => (
              <ProceedingStudy key={study.id} study={study} />
            ))}
      </ul>
    </div>
  );
};

export default ProceedingStudies;
