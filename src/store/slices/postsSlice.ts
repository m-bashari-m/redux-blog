import { createSelector, createSlice } from "@reduxjs/toolkit";
import { PostsSliceType, RootState, StringReactions } from "../types";
import { postsExtraReducers } from "./postsExtraReducers";

const initialState: PostsSliceType = {
  posts: [],
  status: "idle",
  error: undefined,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction as StringReactions]++;
      }
    },
  },
  extraReducers: postsExtraReducers,
});

export const getPostById = (state: RootState, postId: string) => {
  return state.posts.posts.find((post) => Number(post.id) === Number(postId));
};

export const postsSelector = (state: RootState) => state.posts;

export const selectPostsByUser = createSelector(
  [postsSelector, (_, userId) => userId],
  (posts, userId) => posts.posts.filter((post) => post.userId === userId)
);

export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
