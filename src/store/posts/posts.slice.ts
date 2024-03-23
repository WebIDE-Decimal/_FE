import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { Post } from "./post.type.ts";

interface PostsState {
  isLoading: boolean;
  posts: Post[];
  recruitingPosts: Post[];
  finishedPosts: Post[];
  error: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/recruit");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "게시글을 불러오는데 에러가 발생했습니다.",
      );
    }
  },
);

const initialState: PostsState = {
  isLoading: false,
  posts: [],
  recruitingPosts: [],
  finishedPosts: [],
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clickRecruiting: (state) => {
      state.posts = state.posts.filter((post) => post.state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.sort(
          (a: Post, b: Post) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        state.recruitingPosts = action.payload.filter(
          (post: Post) => post.state,
        );
        state.finishedPosts = action.payload.filter(
          (post: Post) => !post.state,
        );
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clickRecruiting } = postsSlice.actions;
export default postsSlice.reducer;
