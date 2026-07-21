import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },

    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUserError: (state, action) => {
      state.error = action.payload;
    },

    clearUserError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUsers,
  setUser,
  clearUser,
  setUserLoading,
  setUserError,
  clearUserError,
} = userSlice.actions;

export default userSlice.reducer;