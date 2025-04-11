import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IBukket } from '../../types/order-types';
import { IDish } from '../../types/dish-types';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Здесь надо будет добавить логику отправки заказа, но добавлю потом
      return { success: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: IBukket = {
  dish: [],
  counts: {},
  orderRequest: false,
  orderFailed: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Добавление блюда в корзину
    addToCart: (state, action: PayloadAction<IDish>) => {
      const dish = action.payload;
      const dishId = dish.id;
      
      // Если блюда нет в корзине, добавляем его
      if (!state.dish.some(d => d.id === dishId)) {
        state.dish.push(dish);
      }
      
      // Увеличиваем счетчик для блюда
      state.counts[dishId] = (state.counts[dishId] || 0) + 1;
    },
    
    // Удаление блюда из корзины
    removeFromCart: (state, action: PayloadAction<number>) => {
      const dishId = action.payload;
      
      // Уменьшаем счетчик
      if (state.counts[dishId] > 1) {
        state.counts[dishId] -= 1;
      } else {
        // Если это последнее блюдо, удаляем его из списка
        delete state.counts[dishId];
        state.dish = state.dish.filter(d => d.id !== dishId);
      }
    },
    
    clearCart: (state) => {
      state.dish = [];
      state.counts = {};
      state.orderFailed = false;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.orderRequest = false;
        state.dish = [];
        state.counts = {};
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderFailed = true;
      });
  }
});

export const { addToCart, removeFromCart, clearCart } = orderSlice.actions;
export default orderSlice.reducer;