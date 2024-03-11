import { createSlice } from "@reduxjs/toolkit";

const dummyList = [
  {
    id: "a",
    title: "ide 프로젝트 하실분 구합니다.",
    author: "김개똥",
    recruit: 4,
    content: "아무것도 모르는 나에게 자바스크립트를 알려줄 노예들 구한다.",
  },
  {
    id: "b",
    title: "프로젝트 하실분 구합니다.",
    author: "이개똥",
    recruit: 2,
    content: "아무것도 모르는 나에게 리액트를 알려줄 노예들 구한다.",
  },
  {
    id: "c",
    title: "프로젝트 하실분 구합니다.",
    author: "박개똥",
    recruit: 6,
    content: "아무것도 모르는 나에게 자바를 알려줄 노예들 구한다.",
  },
  {
    id: "d",
    title: "프로젝트 하실분 구합니다.",
    author: "최개똥",
    recruit: 3,
    content:
      "코딩노예 구합니다. 무임금, 숙식 니들끼리 해결, 더 이상의 자세한 질문은 받지 않겠다.",
  },
];

const initialState = { posts: dummyList };

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, { payload }) => {
      state.posts.unshift(payload);
    },
    removePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
    editPost: (state, { payload }) => {
      state.posts = state.posts.map((post) =>
        post.id === payload.id
          ? {
              ...post,
              title: payload.title,
              recruit: payload.recruit,
              content: payload.content,
            }
          : post
      );
    },
  },
});

export const { removePost, addPost, editPost } = postsSlice.actions;
export default postsSlice.reducer;
