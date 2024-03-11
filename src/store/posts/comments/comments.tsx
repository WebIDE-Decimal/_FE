import { createSlice } from "@reduxjs/toolkit";

interface CommentsState {
  author: string;
  comment: string;
}

const initialState: CommentsState[] = [];

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
