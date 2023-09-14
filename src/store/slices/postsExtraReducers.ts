import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { POSTS_URL, initialReactions } from "../../constants/storeConsts";
import { Post, PostsSliceType } from "../types";
import { sub } from "date-fns";
import { postsAdapter } from "./postsSlice";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: { title: string; body: string; userId: string }) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost: Post) => {
    const { id } = initialPost;
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost: { id: string }) => {
    const { id } = initialPost;
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

export const postsExtraReducers = (
  builder: ActionReducerMapBuilder<PostsSliceType>
) => {
  builder
    .addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.status = "succeeded";
      // Adding date and reactions
      let min = 1;
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return post;
      });

      // Add any fetched posts to the array
      postsAdapter.upsertMany(state, loadedPosts);
    })

    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(addNewPost.pending, (state) => {
      state.status = "loading";
    })
    .addCase(addNewPost.fulfilled, (state, action) => {
      state.status = "succeeded";

      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = initialReactions;

      postsAdapter.addOne(state, action.payload);
    })
    .addCase(updatePost.pending, (state) => {
      state.status = "loading";
    })
    .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.status = "succeeded";
      if (!action.payload?.id) {
        console.log("update colud not complete");
        return;
      }
      postsAdapter.upsertOne(state, action.payload);
    })
    .addCase(deletePost.pending, (state) => {
      state.status = "loading";
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (typeof action.payload === "string") {
        console.log("Delete could not complete");
        console.log(action.payload);
        return;
      }
      postsAdapter.removeOne(state, action.payload.id);
    });
};
