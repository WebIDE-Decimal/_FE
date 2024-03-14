import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewProceedingStudy: false,
  viewAppliedForStudy: false,
  viewRecruitingStudy: false,
  viewMyInformation: true,
  isConfirm: false,
};

const viewPageSlice = createSlice({
  name: "viewPage",
  initialState,
  reducers: {
    clickProceedingStudy: (state) => {
      state.viewMyInformation = false;
      state.viewProceedingStudy = true;
      state.viewAppliedForStudy = false;
      state.viewRecruitingStudy = false;
    },
    clickAppliedForStudy: (state) => {
      state.viewMyInformation = false;
      state.viewProceedingStudy = false;
      state.viewAppliedForStudy = true;
      state.viewRecruitingStudy = false;
    },
    clickRecruitingStudy: (state) => {
      state.viewMyInformation = false;
      state.viewProceedingStudy = false;
      state.viewAppliedForStudy = false;
      state.viewRecruitingStudy = true;
    },
    clickMyInformation: (state) => {
      state.viewMyInformation = true;
      state.viewProceedingStudy = false;
      state.viewAppliedForStudy = false;
      state.viewRecruitingStudy = false;
    },
    clickConfirm: (state, { payload }) => {
      state.isConfirm = payload;
    },
  },
});

export const {
  clickProceedingStudy,
  clickAppliedForStudy,
  clickRecruitingStudy,
  clickMyInformation,
  clickConfirm,
} = viewPageSlice.actions;

export default viewPageSlice.reducer;
