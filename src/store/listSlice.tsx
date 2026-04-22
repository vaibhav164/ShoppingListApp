import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as repo from "../database/listRepo";

export const fetchLists = createAsyncThunk("lists/fetch", async () => {
  return repo.getLists();
});

export const addList = createAsyncThunk(
  "lists/add",
  async ({ name, priority }: { name: string; priority: string }) => {
    repo.insertList(name, priority);
    return repo.getLists();
  },
);

const listSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists = action.payload;
      });
  },
});

export default listSlice.reducer;
