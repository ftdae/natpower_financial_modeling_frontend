import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import tokenService from "../../services/token.service";
import axios, { AxiosError } from "axios";
import { AuthState, User, UserCredentials, UserRegister } from "../types/types";
// import { toast } from "react-toastify";
import { RootState } from "../../hooks/store";
import { toast } from "react-toastify";

const user: User = tokenService.getUser();
let initialState: AuthState = {
  isLoggedIn: false,
  user: { accessToken: "", refreshToken: "" },
  error: "",
};
if (user.accessToken)
  initialState = {
    isLoggedIn: true,
    user: user,
    error: "",
  };
else
  initialState = {
    isLoggedIn: false,
    user: { accessToken: "", refreshToken: "" },
    error: "",
  };

export const registerAsync = createAsyncThunk<AuthState, UserRegister>(
  "auth/register",
  async (userRegister: UserRegister, thunkApi) => {
    if (userRegister.password !== userRegister.passwordConf) {
      thunkApi.dispatch(setError(`Your password doesn't match`));
      return thunkApi.rejectWithValue(`Your password doesn't match`);
    }
    try {
      const response = await authService.register(
        userRegister.email,
        userRegister.password
      );
      if (response.status === 200) {
        return response;
      }
    } catch (_error) {
      const error = _error as Error | AxiosError<any>;
      if (axios.isAxiosError(error)) {
        const resp = error.response?.data;
        thunkApi.dispatch(setError(resp?.detail?.message));
        return thunkApi.rejectWithValue(resp?.detail?.message);
      }
      thunkApi.dispatch(setError(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginAsync = createAsyncThunk<AuthState, UserCredentials>(
  "auth/login",
  async (userCredentials: UserCredentials, thunkApi) => {
    try {
      const response = await authService.login(
        userCredentials.email,
        userCredentials.password
      );
      if (response.accessToken) {
        return response;
      }
    } catch (_error) {
      const error = _error as Error | AxiosError<any>;
      if (axios.isAxiosError(error)) {
        const resp = error.response?.data;
        thunkApi.dispatch(setError(resp?.detail?.message));
        return thunkApi.rejectWithValue(resp?.detail?.message);
      }
      thunkApi.dispatch(setError(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    refreshToken: (state, { payload }) => {
      state.user.accessToken = payload.acessToken;
      state.user.refreshToken = payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.user = payload.user;
        state.error = "";
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        if (payload == "Invalid Password!") {
          toast.error("Password is incorrect. Try again!");
        } else {
          toast.error("Email is incorrect. Try again!");
          state.error = "Invalid Email";
        }
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.error = "";
      })
      .addCase(registerAsync.rejected, (state, { payload }) => {
        if (payload == "Already registered!") {
          // toast.error(
          // 	"User has been already registered. Try again using another email address!"
          // );
          state.isLoggedIn = false;
        } else {
          // toast.error(
          // 	"Your password and confirm password are not same!"
          // );
        }
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        console.log("app log out");
        state.isLoggedIn = false;
        state.user = { accessToken: "", refreshToken: "" };
        state.error = "";
      });
  },
});

export const { setError, refreshToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
