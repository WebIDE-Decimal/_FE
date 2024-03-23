import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: true,
  recruiting: false,
  finished: false,
};

const postCategoriesSlice = createSlice({
  name: "postCategories",
  initialState,
  reducers: {
    toggleTotal: (state, { payload }) => {
      state.total = payload.total;
      state.recruiting = payload.recruiting;
      state.finished = payload.finished;
    },
    toggleRecruiting: (state, { payload }) => {
      state.total = payload.total;
      state.recruiting = payload.recruiting;
      state.finished = payload.finished;
    },
    toggleFinished: (state, { payload }) => {
      state.total = payload.total;
      state.recruiting = payload.recruiting;
      state.finished = payload.finished;
    },
  },
});

export const { toggleTotal, toggleRecruiting, toggleFinished } =
  postCategoriesSlice.actions;
export default postCategoriesSlice.reducer;
