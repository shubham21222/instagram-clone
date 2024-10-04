import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  setSelectedPost: null, // Make sure to initialize all state variables
};

const postSlice = createSlice({
  name: "Post",
  initialState: {
    posts: [],
    selectedPost: null,
  },
  reducers: {
    //actions
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});
export const { setPosts, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
