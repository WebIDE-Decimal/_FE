import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  viewApplyStudyModal: boolean;
}

const initialState: ModalState = {
  viewApplyStudyModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleApplyStudyModal: (state, { payload }) => {
      state.viewApplyStudyModal = payload;
    },
  },
});

export const { toggleApplyStudyModal } = modalSlice.actions;

export default modalSlice.reducer;
