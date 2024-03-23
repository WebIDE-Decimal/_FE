import AppliedForStudy from "./AppliedForStudy/AppliedForStudy.tsx";
import { useEffect, useState } from "react";
import api from "../../../api";

const AppliedForStudies = () => {
  const [appliedForStudies, setAppliedForStudies] = useState([]);

  // useEffect(() => {
  //   const response = async () => {
  //     await api
  //       .get(`/recruitInfo/mypost/info`)
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   };
  //
  //   response();
  // }, []);

  return (
    <div className={"w-full flex mt-12"}>
      <ul
        className={
          "flex w-full px-4 h-full flex-wrap overflow-y-auto max-h-[500px] hide-scrollbar"
        }
      >
        <AppliedForStudy />
      </ul>
    </div>
  );
};

export default AppliedForStudies;
