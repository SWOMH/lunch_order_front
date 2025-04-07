import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_USER_GET_INFO, API_USER_REGISTER } from '../../utils/api-constant';


export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (telegramId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_USER_GET_INFO}?telegram_id=${telegramId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue({
          status: 404,
          message: 'Пользователь не найден'
        });
      }
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_USER_REGISTER, userData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue({
          status: 404,
          message: 'Пользователь не найден'
        });
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
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
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.userNotFound = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userNotFound = action.payload === 'user_not_found';
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistered = true;
        state.userNotFound = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer; 