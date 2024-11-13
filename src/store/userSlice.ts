import { createSlice } from "@reduxjs/toolkit";
import { User } from "../api/authenticate";

type State = {
  user: undefined | User;
  loading: boolean;
  permissions: undefined | string[];
};

const initialState: State = {
  user: undefined,
  loading: false,
  permissions: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticateAction: (state) => {
      state.loading = true;
    },
    authenticatedAction: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    authorizeAction: (state) => {
      state.loading = true;
    },
    authorizedAction: (state, action) => {
      state.loading = false;
      state.permissions = action.payload;
    },
  },
});

export const {
  authenticateAction,
  authenticatedAction,
  authorizeAction,
  authorizedAction,
} = userSlice.actions;

export default userSlice.reducer;
