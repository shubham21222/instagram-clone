import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
  selectedUser:null,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser:(state,action) => {
      state.selectedUser = action.payload;
  }
  },
});

export const { setUserProfile , setSelectedUser } = authSlice.actions;
export default authSlice.reducer;
