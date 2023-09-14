import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Post, RootState, StringReactions } from "../types";
import { postsExtraReducers } from "./postsExtraReducers";

export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: undefined,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction as StringReactions]++;
      }
    },
  },
  extraReducers: postsExtraReducers,
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostsById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const selectPostsError = (state: RootState) => state.posts.error;

export const selectPostsStatus = (state: RootState) => state.posts.status;

export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
