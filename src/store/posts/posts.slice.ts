import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { Post } from "./post.type.ts";

interface PostsState {
  isLoading: boolean;
  posts: Post[];
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
      return thunkAPI.rejectWithValue(
        "게시글을 불러오는데 에러가 발생했습니다.",
      );
    }
  },
);

const initialState: PostsState = {
  isLoading: false,
  posts: [],
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default postsSlice.reducer;
