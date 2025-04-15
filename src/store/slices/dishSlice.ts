import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_GET_ALL_DISH } from '../../utils/api-constant';
import { IDish, IDishesResponse, IDishesState } from '../../types/dish-types'
import { IApiError } from '../../types/other-types';


export const getAllDish = createAsyncThunk<IDish[], void, { rejectValue: IApiError }>(
  'dish/getAllDish',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IDishesResponse>(API_GET_ALL_DISH);
      return response.data.dishes;
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        return rejectWithValue({
          message: 'Неизвестная ошибка'
        });
      }
      if (!error.response) {
        return rejectWithValue({
          message: 'Нет соединения с сервером'
        });
      }
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data?.message || 'Ошибка при загрузке блюд'
      });
    }
  }
);


const initialState: IDishesState = {
    dishes: [],
    isLoading: false,
    isLoaded: false,
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
        if (!state.isLoaded) {
          state.isLoading = true;
          state.error = null;
        }
      })
      .addCase(getAllDish.fulfilled, (state, action: PayloadAction<IDish[]>) => {
        state.isLoading = false;
        state.dishes = [...action.payload];
        state.isLoaded = true;
      })
      .addCase(getAllDish.rejected, (state, action: PayloadAction<IApiError | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Неизвестная ошибка' };
      });
  }
});

export const { clearDishesError } = dishSlice.actions;
export default dishSlice.reducer;