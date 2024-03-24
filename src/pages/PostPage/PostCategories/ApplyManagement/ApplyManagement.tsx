import React, { useEffect, useRef, useState } from "react";
import api from "../../../../api";
import Applicant from "./Applicant/Applicant.tsx";

type ApplyManagementProps = {
  id: string;
};

export type totalAppliesProps = {
  id: number;
  motivation: string;
  userNickname: string;
  state: string;
  createdAt: string;
};

const ApplyManagement = ({ id }: ApplyManagementProps) => {
  const [totalApplies, setTotalApplies] = useState<totalAppliesProps[]>([]);
  const [clickComplete, setClickComplete] = useState(false);

  useEffect(() => {
    response();
  }, []);

  const handleCompleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("지원 완료 클릭");

    setClickComplete(true);
  };

  console.log(totalApplies);

  const response = async () => {
    await api
      .get(`/recruitInfo/${Number(id)}`)
      .then((res) => setTotalApplies(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className={"text-white min-h-[478px]"}>
      <div className={"w-full"}>
        <button
          onClick={handleCompleteButton}
          disabled={clickComplete}
          className={`${clickComplete ? "bg-gray hover:cursor-not-allowed" : "bg-[#4CAF50]/90 hover:bg-[#4CAF50]"} float-right text-white rounded px-2 py-1`}
        >
          모집 완료
        </button>
      </div>
      {totalApplies.length !== 0 ? (
        totalApplies.map((apply) => (
          <Applicant
            clickComplete={clickComplete}
            key={apply.id}
            apply={apply}
          />
        ))
      ) : (
        <div className={"text-white text-3xl text-center"}>
          지원자가 없습니다.
        </div>
      )}
    </div>
  );
};

export default ApplyManagement;
