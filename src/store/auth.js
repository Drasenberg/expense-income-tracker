import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  token: "",
  password: "",
  accountId: "",
};
const axios = require("axios").default;
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.idToken;
      state.accountId = action.payload.localId;
      localStorage.setItem("accId", action.payload.localId);
      localStorage.setItem("token", state.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("accId");
    },
    onChangePassword(state, action) {
      state.password = action.payload;
    },
    shouldBeLoggedIn(state) {
      const token = localStorage.getItem("token");
      const accId = localStorage.getItem("accId");
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
        state.accountId = accId;
      } else {
        state.isLoggedIn = false;
        state.token = "";
        state.accountId = "";
      }
    },
  },
});

export const loginAction = (userData) => {
  return async (dispatch) => {
    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_u14kSxJ_hbNWPHKxPGNm-2yyb53YfU8",
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        dispatch(authActions.login(response.data));
      });
  };
};

export const authActions = authSlice.actions;

export default authSlice.reducer;
