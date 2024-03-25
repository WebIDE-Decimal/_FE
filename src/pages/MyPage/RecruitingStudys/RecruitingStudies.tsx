import RecruitingStudy from "./RecruitingStudy/RecruitingStudy.tsx";
import { useEffect, useState } from "react";
import api from "../../../api";
import { Post } from "../../../store/posts/post.type.ts";

const RecruitingStudies = () => {
  const [recruitingStudies, setRecruitingStudies] = useState<Post[]>([]);

  useEffect(() => {
    const response = async () => {
      await api
        .get(`/recruit/myPost`)
        .then((res) =>
          res.data
            .filter((post: Post) => post.state)
            .sort(
              (a: Post, b: Post) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
            ),
        )
        .then((res) => setRecruitingStudies(res))
        .catch((err) => console.log(err));
    };
    response();
  }, []);

  console.log(recruitingStudies);

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
