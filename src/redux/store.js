import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice";
import postReducer from "./postSlice";
import userReducer from "./authSlice"
import chatSlice from "./chatSlice"
import socketSlice from "./socketSlice"
// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Auth", "Post", "userAuth" , "Chat" , "Socketio"], // Add the slices you want to persist here
};

const rootReducer = combineReducers({
  Auth: authReducer,
  Post: postReducer,
  userAuth: userReducer,
  Chat : chatSlice,
  Socketio : socketSlice,
  // Add more reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
