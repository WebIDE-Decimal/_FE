import { createSlice } from "@reduxjs/toolkit";
import { Post } from "./post.type.ts";

const initialState: { posts: Post[] } = {
  posts: [
    {
      id: "a",
      writerId: 123,
      title: "자바스크립트",
      content: "123 자바스크립트",
      recruited: 6,
      state: "모집중",
      target: "java 스터디원",
      localDateTime: "123",
    },
  ],
};

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
              totalPeople: payload.totalPeople,
              content: payload.content,
            }
          : post,
      );
    },
  },
});

export const { removePost, addPost, editPost } = postsSlice.actions;
export default postsSlice.reducer;
