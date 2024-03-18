import { createSlice } from "@reduxjs/toolkit";
import { Post } from "./post.type.ts";

const initialState: { posts: Post[] } = { posts: [] };

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
