import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostsSliceType, RootState, StringReactions } from "../types";
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
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
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

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
