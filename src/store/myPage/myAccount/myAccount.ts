import { createSlice } from "@reduxjs/toolkit";

interface MyAccount {
  nickName: string;
  email: string;
  introduce: string;
}

const initialState: MyAccount = {
  nickName: "김개똥",
  email: "abcdefg@naver.com",
  introduce:
    "안녕 날 소개하지 내 이름은 김개똥 취미는 밥먹기 똥싸기 잠자기다 잘 부탁한다",
};

const myAccountSlice = createSlice({
  name: "myAccount",
  initialState,
  reducers: {},
});

export default myAccountSlice.reducer;
