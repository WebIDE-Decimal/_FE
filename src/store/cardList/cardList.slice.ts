import { createSlice } from "@reduxjs/toolkit";

const dummyList = [
  {
    id: "a",
    title: "ide 프로젝트 하실분 구합니다.",
    author: "김개똥",
    recruit: "프론트 엔드: 1인, 백엔드 1인",
    content: "아무것도 모르는 나에게 자바스크립트를 알려줄 노예들 구한다.",
  },
  {
    id: "b",
    title: "프로젝트 하실분 구합니다.",
    author: "이개똥",
    recruit: "프론트 엔드: 2인, 백엔드 3인",
    content: "아무것도 모르는 나에게 리액트를 알려줄 노예들 구한다.",
  },
  {
    id: "c",
    title: "프로젝트 하실분 구합니다.",
    author: "박개똥",
    recruit: "프론트 엔드: 3인, 백엔드 2인",
    content: "아무것도 모르는 나에게 자바를 알려줄 노예들 구한다.",
  },
  {
    id: "d",
    title: "프로젝트 하실분 구합니다.",
    author: "최개똥",
    recruit: "프론트 엔드: 1인, 백엔드 2인",
    content:
      "코딩노예 구합니다. 무임금, 숙식 니들끼리 해결, 더 이상의 자세한 질문은 받지 않겠다.",
  },
];

const initialState = { cardList: dummyList };

const cardListSlice = createSlice({
  name: "cardList",
  initialState,
  reducers: {},
});

export default cardListSlice.reducer;
