import InitialState, { UpdateAuthAction } from "./AuthRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  isAuth: false,
  user: null,
  isOnline: false,
  sessionCreated: 0,
};

export const AuthSlice = createSlice({
  name: UpdateAuthAction,
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      console.log(action.payload)
    },
    setAuthUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
    setIsOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
      console.log(action.payload)
    },
    setSessionUser: (state, action: PayloadAction<number>) => {
      state.sessionCreated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setAuthUser, deleteUser, setIsOnline, setSessionUser } =
AuthSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default AuthSlice.reducer;
