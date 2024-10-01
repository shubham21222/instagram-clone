import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user_Details: null, // Make sure to initialize all state variables
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    userDetails: (state, action) => {
      state.user_Details = action.payload;
    },
    removeUsersDetails: (state) => {
      state.user_Details = null;
    },
  },
});

export const { setToken, removeToken, userDetails, removeUsersDetails } =
  authSlice.actions;
export default authSlice.reducer;
