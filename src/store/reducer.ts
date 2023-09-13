import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/usersSlice";
import postsReducer from "./slices/postsSlice";

export const rootReducer = combineReducers({
  users: userReducer,
  posts: postsReducer,
});
