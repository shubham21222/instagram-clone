import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfile } = authSlice.actions;
export default authSlice.reducer;
