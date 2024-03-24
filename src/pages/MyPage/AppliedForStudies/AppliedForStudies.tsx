import AppliedForStudy from "./AppliedForStudy/AppliedForStudy.tsx";
import { useEffect, useState } from "react";
import api from "../../../api";
import { Post } from "../../../store/posts/post.type.ts";

const AppliedForStudies = () => {
  const [appliedForStudies, setAppliedForStudies] = useState<Post[]>([]);

  useEffect(() => {
    const response = async () => {
      await api
        .get(`/recruitInfo/myApply`)
        .then((res) => setAppliedForStudies(res.data))
        .catch((err) => console.log(err));
    };

    response();
  }, []);

  if (appliedForStudies.length === 0) {
    return (
      <div className={"text-white text-2xl text-center"}>
        지원한 스터디가 없습니다.
      </div>
    );
  }

  return (
    <div className={"w-full flex mt-12"}>
      <ul
        className={
          "flex w-full px-4 h-full flex-wrap overflow-y-auto max-h-[500px] hide-scrollbar"
        }
      >
        {appliedForStudies.length !== 0 &&
          appliedForStudies.map((study) => (
            <AppliedForStudy key={study.id} study={study} />
          ))}
      </ul>
    </div>
  );
};

export default AppliedForStudies;
