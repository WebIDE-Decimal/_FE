import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewMyStudy: true,
  viewMyAccount: false,
  viewProceedingStudy: true,
  viewAppliedForStudy: false,
  viewFinishedStudy: false,
  viewMyInformation: true,
  viewResetPassword: false,
  viewWithdrawal: false,
  isConfirm: false,
};

const viewPageSlice = createSlice({
  name: "viewPage",
  initialState,
  reducers: {
    clickMyStudy: (state) => {
      state.viewMyStudy = true;
      state.viewMyAccount = false;
    },
    clickMyAccount: (state) => {
      state.viewMyAccount = true;
      state.viewMyStudy = false;
    },
    clickProceedingStudy: (state) => {
      state.viewProceedingStudy = true;
      state.viewResetPassword = false;
      state.viewWithdrawal = false;
    },
    clickAppliedForStudy: (state) => {
      state.viewAppliedForStudy = true;
      state.viewProceedingStudy = false;
      state.viewFinishedStudy = false;
    },
    clickFinishedStudy: (state) => {
      state.viewFinishedStudy = true;
      state.viewProceedingStudy = false;
      state.viewAppliedForStudy = false;
    },
    clickMyInformation: (state) => {
      state.viewMyInformation = true;
      state.viewResetPassword = false;
      state.viewWithdrawal = false;
    },
    clickResetPassword: (state) => {
      state.viewResetPassword = true;
      state.viewMyInformation = false;
      state.viewWithdrawal = false;
    },
    clickWithdrawal: (state) => {
      state.viewWithdrawal = true;
      state.viewMyInformation = false;
      state.viewResetPassword = false;
    },
    clickConfirm: (state, { payload }) => {
      state.isConfirm = payload;
    },
  },
});

export const {
  clickMyStudy,
  clickMyAccount,
  clickProceedingStudy,
  clickAppliedForStudy,
  clickFinishedStudy,
  clickMyInformation,
  clickResetPassword,
  clickWithdrawal,
  clickConfirm,
} = viewPageSlice.actions;

export default viewPageSlice.reducer;
