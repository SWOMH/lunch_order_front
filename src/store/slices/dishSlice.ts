import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ADMIN_ADD_DISH, API_GET_ALL_DISH } from '../../utils/api-constant';
import { IDish, IDishesResponse, IDishesState } from '../../types/dish-types'
import { IApiError } from '../../types/other-types';
import { RootState } from '../store';
import { API_ADMIN_EDIT_DISH } from '../../utils/api-constant';


export const getAllDish = createAsyncThunk<IDish[], void, { rejectValue: IApiError }>(
  'dish/getAllDish',
  async (_, {getState, rejectWithValue }) => {
    const { dish } = getState() as RootState
    if (dish.isLoaded) {
      return dish.dishes;
    }

    try {
      const response = await axios.get<IDishesResponse>(API_GET_ALL_DISH);
      return response.data.dishes;
    } catch (error) {
      console.error('Ошибка запроса:', error);
      if (!axios.isAxiosError(error)) {
        return rejectWithValue({ message: 'Неизвестная ошибка' });
      }
      if (!error.response) {
        return rejectWithValue({ message: 'Нет соединения с сервером' });
      }
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data?.message || 'Ошибка при загрузке блюд'
      });
    }
  }
);


export const addDish = createAsyncThunk<IDish, DishUpdateData, { rejectValue: IApiError }>(
  'dish/addDish',
  async (dishData, { rejectWithValue }) => {
    try {
      const response = await axios.post<IDish>(API_ADMIN_ADD_DISH, dishData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при добавлении блюда:', error);
      if (!axios.isAxiosError(error)) {
        return rejectWithValue({ message: 'Неизвестная ошибка' });
      }
      if (!error.response) {
        return rejectWithValue({ message: 'Нет соединения с сервером' });
      }
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data?.message || 'Ошибка при добавлении блюда'
      });
    }
  }
);



interface DishUpdateData {
  dish_name: string;
  description: string;
  price: number;
  available: boolean;
  image: string | null;
  type: string;
  stop_list: boolean;
  is_combo: boolean;
  additives: boolean;
  variants: Array<{
    dish_id: number;
    size: string;
    price: number;
  }> | null;
};

export const updateDish = createAsyncThunk<IDish, { dishId: number; dishData: DishUpdateData }, { rejectValue: IApiError }>(
  'dish/updateDish',
  async ({ dishId, dishData }, { rejectWithValue }) => {
    try {
      const response = await axios.put<IDish>(`${API_ADMIN_EDIT_DISH}/${dishId}`, dishData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении блюда:', error);
      if (!axios.isAxiosError(error)) {
        return rejectWithValue({ message: 'Неизвестная ошибка' });
      }
      if (!error.response) {
        return rejectWithValue({ message: 'Нет соединения с сервером' });
      }
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data?.message || 'Ошибка при обновлении блюда'
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
      })
      .addCase(updateDish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDish.fulfilled, (state, action: PayloadAction<IDish>) => {
        state.isLoading = false;
        state.dishes = state.dishes.map(dish => 
          dish.id === action.payload.id ? action.payload : dish
        );
      })
      .addCase(updateDish.rejected, (state, action: PayloadAction<IApiError | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Ошибка при обновлении блюда' };
      })
      .addCase(addDish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDish.fulfilled, (state, action: PayloadAction<IDish>) => {
        state.isLoading = false;
        state.dishes = [...state.dishes, action.payload];
      })
      .addCase(addDish.rejected, (state, action: PayloadAction<IApiError | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Ошибка при добавлении блюда' };
      });
  }
});

export const { clearDishesError } = dishSlice.actions;
export default dishSlice.reducer;