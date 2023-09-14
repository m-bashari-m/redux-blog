import { EntityState } from "@reduxjs/toolkit";
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type User = {
  id: string;
  name: string;
};

export type UserSliceType = User[];

export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export type Post = {
  id: string;
  title: string;
  body: string;
  date: string;
  userId?: string;
  reactions: Reactions;
};

export type PostsSliceType = EntityState<Post> & {
  status: string;
  error?: string;
};

export type Reactions = {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
};

export type StringReactions =
  | "thumbsUp"
  | "wow"
  | "rocket"
  | "heart"
  | "coffee";
