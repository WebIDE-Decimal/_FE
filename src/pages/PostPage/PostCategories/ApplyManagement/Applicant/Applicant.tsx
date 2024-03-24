import React, { FC, useState } from "react";
import { RxTriangleDown, RxTriangleRight } from "react-icons/rx";
import { totalAppliesProps } from "../ApplyManagement.tsx";
import api from "../../../../../api";

type ApplicantProps = {
  apply: totalAppliesProps;
  clickComplete: boolean;
};

const Applicant: FC<ApplicantProps> = ({ apply, clickComplete }) => {
  const [clickToggle, setClickToggle] = useState(false);
  const [applyState, setApplyState] = useState(apply.state || null);
  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clickToggle ? setClickToggle(false) : setClickToggle(true);
  };

  const handleAcceptClick = async () => {
    await api
      .patch(`/recruitInfo/${apply.id}/response?accept=true`)
      .then(() => setApplyState("APPROVE"))
      .catch((err) => console.log(err));
  };

  const handleRefuseClick = async () => {
    await api
      .patch(`/recruitInfo/${apply.id}/response?accept=false`)
      .then(() => setApplyState("DISAPPROVE"))
      .catch((res) => console.log(res));
  };

  return (
    <div>
      <div className={"flex items-center"}>
        <button
          className={`${clickToggle ? "text-white" : "text-gray"} text-2xl`}
          onClick={handleToggleClick}
        >
          {clickToggle ? <RxTriangleDown /> : <RxTriangleRight />}
        </button>
        <div
          className={`${applyState === "WAITING" ? "text-white" : "text-gray"} ml-1`}
        >
          <p>지원자: {apply.userNickname}</p>
        </div>
      </div>
      {clickToggle && (
        <div className={"ml-6 w-full"}>
          <p>{apply.motivation}</p>
          {applyState === "WAITING" && !clickComplete ? (
            <div className={"float-right mt-1"}>
              <button
                onClick={handleAcceptClick}
                className={"bg-darkgreen mr-1 rounded px-1 py-1"}
              >
                지원 수락
              </button>
              <button
                onClick={handleRefuseClick}
                className={"bg-red-500 ml-1 rounded px-1 py-1"}
              >
                지원 거절
              </button>
            </div>
          ) : applyState === "APPROVE" ? (
            <p>승인된 지원 입니다.</p>
          ) : applyState === "DISAPPROVE" ? (
            <p>거절된 지원 입니다.</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Applicant;
