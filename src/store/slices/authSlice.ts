import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ADMIN_EDIT_USER_STATUS, API_ADMIN_GET_ALL_USERS, API_USER_GET_INFO, API_USER_REGISTER } from '../../utils/api-constant';
import { IUser, AuthState, IRegisterUserData, IAdminUsers, ITelegramId } from '../../types/user-types';
import { IApiError } from '../../types/other-types'
import { RootState } from '../store';




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

export const getAdminAllUserInfo = createAsyncThunk<IAdminUsers[], number, { rejectValue: IApiError }>(
  'auth/getAdminAllUserInfo',
  async (telegramId: number, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ADMIN_GET_ALL_USERS, {
        telegram_id: telegramId
      });
      return response.data.users;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return rejectWithValue({
            status: 404,
            message: 'Неверный URL'
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

export const adminEditUserStatus = createAsyncThunk<void, number, { rejectValue: IApiError }>(
  'auth/adminEditUserStatus',
  async (user_telegram_id: number, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as RootState; 
      await axios.post(`${API_ADMIN_EDIT_USER_STATUS}?telegram_id_admin=${user.user?.telegram_id}&telegram_id_user=${user_telegram_id}`);
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
  userNotFound: false,
  adminUsers: [],
  isAdminLoading: false,
  isAdminError: null,
  adminEditUserStatusLoading: false,
  adminEditUserStatusError: null
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
      })
      .addCase(getAdminAllUserInfo.pending, (state) => {
        state.isAdminLoading = true;
        state.isAdminError = null;
      })
      .addCase(getAdminAllUserInfo.fulfilled, (state, action: PayloadAction<IAdminUsers[]>) => {
        state.isAdminLoading = false;
        state.adminUsers = action.payload;
      })
      .addCase(getAdminAllUserInfo.rejected, (state, action: PayloadAction<IApiError | undefined>) => {
        state.isAdminLoading = false;
        state.isAdminError = action.payload || { message: 'Неизвестная ошибка' };
      })
      .addCase(adminEditUserStatus.pending, (state) => {
        state.adminEditUserStatusLoading = true;
        state.adminEditUserStatusError = null;
      })
      .addCase(adminEditUserStatus.fulfilled, (state, action) => {
        state.adminEditUserStatusLoading = false;
        const userIndex = state.adminUsers.findIndex(user => user.telegram_id === action.meta.arg);
        if (userIndex !== -1) {
          state.adminUsers[userIndex].banned = !state.adminUsers[userIndex].banned;
        }
      })
      .addCase(adminEditUserStatus.rejected, (state, action: PayloadAction<IApiError | undefined>) => {
        state.adminEditUserStatusLoading = false;
        state.adminEditUserStatusError = action.payload || { message: 'Неизвестная ошибка' };
      });
  }
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;