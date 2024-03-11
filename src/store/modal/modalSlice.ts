import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  viewApplyStudyModal: boolean;
  viewAlertModal: boolean;
}

const initialState: ModalState = {
  viewApplyStudyModal: false,
  viewAlertModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleApplyStudyModal: (state, { payload }) => {
      state.viewApplyStudyModal = payload;
    },
    toggleAlertModal: (state, { payload }) => {
      state.viewAlertModal = payload;
    },
  },
});

export const { toggleApplyStudyModal, toggleAlertModal } = modalSlice.actions;

export default modalSlice.reducer;
