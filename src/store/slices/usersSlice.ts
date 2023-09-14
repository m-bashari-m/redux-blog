import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, UserSliceType } from "../types";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState: UserSliceType = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const getUserById = (state: RootState, userId: string) => {
  return state.users.find((user) => Number(user.id) === Number(userId));
};

export const usersSelector = (state: RootState) => state.users;

export default usersSlice.reducer;
