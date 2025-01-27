// import { createSlice } from "@reduxjs/toolkit";

// const rtnSlice = createSlice({
//   name: "realTimeNotification",
//   initialState: {
//     likeNotification: [], // [1,2,3]
//   },
//   reducers: {
//     setLikeNotification: (state, action) => {
//       console.log(state , "state")
//       console.log(action , "action")

//       if (action.payload.type === "like") {
//         state.likeNotification.push(action.payload);
//       } else if (action.payload.type === "dislike") {
//         state.likeNotification = state.likeNotification.filter(
//           (item) => item.userId !== action.payload.userId
//         );
//       }
//     },
//   },
// });
// export const { setLikeNotification } = rtnSlice.actions;
// export default rtnSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
  name: "realTimeNotification",
  initialState: {
    likeNotification: [], // array to store notifications
  },
  reducers: {
    setLikeNotification: (state, action) => {
      console.log(state, "state");
      console.log(action, "action");

      if (action.payload.type === "like") {
        // Adding the notification object to the array
        state.likeNotification.push(action.payload);
      } else if (action.payload.type === "dislike") {
        // Filtering out the notification based on userId
        state.likeNotification = state.likeNotification.filter(
          (item) => item.userId !== action.payload.userId
        );
      }
    },
  },
});

export const { setLikeNotification } = rtnSlice.actions;
export default rtnSlice.reducer;
