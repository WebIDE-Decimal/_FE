import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { Post } from "./post.type.ts";

export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id: number, thunkAPI) => {
    try {
      const response = await api.get(`/recruit/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        "게시글을 불러오는데 에러가 발생했습니다.",
      );
    }
  },
);

type postType = {
  isLoading: boolean;
  post: Post;
  error: string;
};

const initialState: postType = {
  isLoading: false,
  post: {
    id: 0,
    isDeleted: false,
    title: "",
    content: "",
    recruited: 0,
    state: false,
    target: "",
    createdAt: "",
    updatedAt: "",
  },
  error: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.post = payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as unknown as string;
      });
  },
});

export default postSlice.reducer;
