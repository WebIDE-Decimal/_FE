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
        .then((res) => setRecruitingStudies(res.data))
        .catch((err) => console.log(err));
    };
    response();
  }, []);

  return (
    <div className={"w-full flex mt-12"}>
      <ul
        className={
          "flex w-full px-4 h-full flex-wrap overflow-y-auto max-h-[500px] hide-scrollbar"
        }
      >
        {recruitingStudies.length !== 0 &&
          recruitingStudies
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
            )
            .map((study) => <RecruitingStudy key={study.id} study={study} />)}
      </ul>
    </div>
  );
};

export default RecruitingStudies;
