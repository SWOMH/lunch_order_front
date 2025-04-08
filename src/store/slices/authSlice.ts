import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_USER_GET_INFO, API_USER_REGISTER } from '../../utils/api-constant';
import { IUser, AuthState, IRegisterUserData } from '../../types/user-types';
import { IApiError } from '../../types/other-types'




export const getUserInfo = createAsyncThunk<IUser, string, { rejectValue: IApiError }>(
  'auth/getUserInfo',
  async (telegramId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ user: IUser }>(`${API_USER_GET_INFO}?telegram_id=${telegramId}`);
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return rejectWithValue({
            status: 404,
            message: 'Пользователь не найден'
          });
        }
        return rejectWithValue({
          status: error.response?.status,
          message: error.message
        });
      }
      return rejectWithValue({
        message: 'Неизвестная ошибка'
      });
    }
  }
);




export const registerUser = createAsyncThunk<void, IRegisterUserData, { rejectValue: IApiError }>(
  'auth/registerUser',
  async (userData: IRegisterUserData, { rejectWithValue }) => {
    try {
      await axios.post(API_USER_REGISTER, userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return rejectWithValue({
            status: 404,
            message: 'Пользователь не найден'
          });
        }
        return rejectWithValue({
          status: error.response?.status,
          message: error.message
        });
      }
      return rejectWithValue({
        message: 'Неизвестная ошибка'
      });
    }
  }
);

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isRegistered: false,
  error: null,
  userNotFound: false
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isRegistered = false;
      state.error = null;
      state.userNotFound = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // getUserInfo
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userNotFound = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.userNotFound = false;
      })
      .addCase(getUserInfo.rejected, (state, action: PayloadAction<IApiError | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Неизвестная ошибка' };
        state.userNotFound = action.payload?.status === 404;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isRegistered = true;
        state.userNotFound = false;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<IApiError | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Неизвестная ошибка' };
      });
  }
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;