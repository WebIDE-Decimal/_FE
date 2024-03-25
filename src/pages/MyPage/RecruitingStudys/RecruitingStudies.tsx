import RecruitingStudy from "./RecruitingStudy/RecruitingStudy.tsx";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../../store/posts/posts.slice.ts";

const RecruitingStudies = () => {
  const [recruitingStudies, setRecruitingStudies] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
      .then((res) => res.payload.filter((study: any) => study.isWriter))
      .then((res) => setRecruitingStudies(res));
  }, []);

  return (
    <div className={"w-full flex mt-12"}>
      <ul
        className={
          "flex w-full px-4 h-full flex-wrap overflow-y-auto max-h-[500px] hide-scrollbar"
        }
      >
        {recruitingStudies.length !== 0 &&
          recruitingStudies.map((study, index) => (
            <RecruitingStudy key={index} study={study} />
          ))}
      </ul>
    </div>
  );
};

export default RecruitingStudies;
