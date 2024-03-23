import React, { useState } from "react";
import { RxTriangleDown, RxTriangleRight } from "react-icons/rx";

const Applicant = ({ apply }) => {
  const [clickToggle, setClickToggle] = useState(false);
  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clickToggle ? setClickToggle(false) : setClickToggle(true);
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
        <div className={"ml-1"}>
          <p>지원자: </p>
        </div>
      </div>
      {clickToggle && (
        <div className={"ml-5"}>
          <p>{apply.motivation}</p>
        </div>
      )}
    </div>
  );
};

export default Applicant;
