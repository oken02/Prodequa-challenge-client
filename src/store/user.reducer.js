import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

import axios from "axios";
import { socket } from "../socket";
import { getAuthHeader } from "../utils";

export const sendValidation = createAsyncThunk(
  "SEND_VALIDATION",
  (data, thunkAPI) => {
    return axios
      .get("/api/auth/validate", {}, getAuthHeader())
      .then(({ data }) => data);
  }
);

export const sendLogin = createAsyncThunk("SEND_LOGIN", (credentials) => {
  return axios.post("/api/auth/login", credentials).then(({ data }) => data);
});

export const sendLogout = createAction("SEND_LOGOUT");

const isLoggedReducer = createReducer(
  {
    isValidated: !!!localStorage.getItem("token"),
    isAuthenticated: false,
  },
  {
    // [sendLogout]: (state, { payload: user }) => {
    //   localStorage.removeItem("token");
    //   state.data = {};
    //   state.isValidated = true;
    //   state.isAuthenticated = false;
    // },

    [sendLogin.fulfilled]: (state, { payload }) => {
      localStorage.setItem("token", payload.token);
      socket.emit("get-forms");
      return { ...state, isAuthenticated: true, ...payload.user };
    },

    [sendLogin.rejected]: (state, action) => {
      state.isAuthenticated = false;
    },

    [sendValidation.fulfilled]: (state, { payload }) => {
      return { isValidated: true, isAuthenticated: true, ...payload.user };
    },

    [sendValidation.rejected]: (state, action) => {
      localStorage.removeItem("token");
      return { isValidated: true, isAuthenticated: false };
    },
  }
);

export default isLoggedReducer;
