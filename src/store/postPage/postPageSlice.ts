import { createSlice } from "@reduxjs/toolkit";

interface PostPageState {
  viewRecruitDescription: boolean;
  viewApplyManagement: boolean;
  viewStudySettingModal: boolean;
}

const initialState: PostPageState = {
  viewRecruitDescription: true,
  viewApplyManagement: false,
  viewStudySettingModal: false,
};

const postPageSlice = createSlice({
  name: "postPage",
  initialState,
  reducers: {
    clickRecruitDescription: (state) => {
      state.viewRecruitDescription = true;
      state.viewApplyManagement = false;
      state.viewStudySettingModal = false;
    },
    clickApplyManagement: (state) => {
      state.viewRecruitDescription = false;
      state.viewApplyManagement = true;
      state.viewStudySettingModal = false;
    },
    clickStudySettingModal: (state, { payload }) => {
      state.viewStudySettingModal = payload;
    },
  },
});

export const {
  clickRecruitDescription,
  clickApplyManagement,
  clickStudySettingModal,
} = postPageSlice.actions;

export default postPageSlice.reducer;
