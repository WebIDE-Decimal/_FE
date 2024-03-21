// src/features/openVidu/openViduSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OpenViduState {
  myUserName: string;
  session: any; // Use a more specific type if available
  publisher: any; // Use a more specific type if available
}

const initialState: OpenViduState = {
  myUserName: "",
  session: null,
  publisher: null,
};

const openViduSlice = createSlice({
  name: "openvidu",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.myUserName = action.payload;
    },
    setSession: (state, action: PayloadAction<any>) => {
      state.session = action.payload;
    },
    setPublisher: (state, action: PayloadAction<any>) => {
      state.publisher = action.payload;
    },
  },
});

export const { setUserName, setSession, setPublisher } = openViduSlice.actions;

export default openViduSlice.reducer;
