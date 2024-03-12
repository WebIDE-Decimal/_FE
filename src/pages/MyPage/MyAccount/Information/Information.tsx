import defaultImg from "../../../../assets/user.png";
import React, { useRef, useState } from "react";

const Information = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState("");
  const handleImgClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) {
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImg(imgUrl);
    }
  };

  return (
    <div>
      <div>
        <div>
          <input
            ref={inputRef}
            onChange={handleImgChange}
            type={"file"}
            className={"hidden"}
          />
          <div>
            <img
              className={"w-28 h-28 rounded-full"}
              src={`${img ? img : defaultImg}`}
              alt={"profile image"}
            />
            <button onClick={handleImgClick} className={"bg-gray rounded"}>
              이미지 변경
            </button>
          </div>
          <div>
            <p>이메일: </p>
            <p>닉네임: </p>
          </div>
        </div>
        <div>
          <p>내 소개</p>
          <textarea className={"resize-none"} />
        </div>
      </div>
    </div>
  );
};

export default Information;
