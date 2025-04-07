import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_GET_ALL_DISH } from '../../utils/api-constant';


export const getAllDish = createAsyncThunk(
    'dish/getAllDish',
    async (_, { rejectWithValue }) => { // Исправлено: первый параметр заменен на _ (не используется)
      try {
        const response = await axios.get(API_GET_ALL_DISH);
        return response.data;
      } catch (error) {
        if (!error.response) {
          return rejectWithValue('Нет соединения с сервером');
        }
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || 'Ошибка при загрузке блюд'
        });
      }
    }
  );

  
const initialState = {
    dish: [],
    isLoading: false,
    error: null,
};

const dishSlice = createSlice({
    name: 'dish',
    initialState,
    reducers: {
        clearDishesError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllDish.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getAllDish.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dish = action.payload;
        })
        .addCase(getAllDish.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});