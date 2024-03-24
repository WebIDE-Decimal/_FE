import React, { useEffect, useState } from "react";
import api from "../../../../api";
import Applicant from "./Applicant/Applicant.tsx";

type ApplyManagementProps = {
  id?: string;
  clickComplete: boolean;
};

export type totalAppliesProps = {
  id: number;
  motivation: string;
  userNickname: string;
  state: string;
  createdAt: string;
};

const ApplyManagement = ({ id, clickComplete }: ApplyManagementProps) => {
  const [totalApplies, setTotalApplies] = useState<totalAppliesProps[]>([]);

  useEffect(() => {
    response();
  }, []);

  console.log(totalApplies);

  const response = async () => {
    await api
      .get(`/recruitInfo/${Number(id)}`)
      .then((res) => setTotalApplies(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className={"text-white min-h-[478px]"}>
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
