import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: null,
  //   user_Details: null,
};

const authSlice = createSlice({
  name: "List",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
