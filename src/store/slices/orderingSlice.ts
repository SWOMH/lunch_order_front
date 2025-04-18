import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAllOrdersHistory, IBukket, IBukketDish } from '../../types/order-types';
import { IDish } from '../../types/dish-types';
import { IApiError } from '../../types/other-types';
import { API_USER_ALL_ORDERS } from '../../utils/api-constant';

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

interface IOrdersResponse {
  orders: IAllOrdersHistory[];
}

export const getUserOrders = createAsyncThunk<IAllOrdersHistory[], string, { rejectValue: IApiError }>(
  'order/getUserOrders',
  async (telegramId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<IOrdersResponse>(`${API_USER_ALL_ORDERS}?telegram_id=${telegramId}`);
      return response.data.orders;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status
      });
    }
  }
);


const initialState: IBukket = {
  dish: [], //[{dish: 1, variant: 1}, {...}]
  counts: {},
  orderRequest: false,
  orderFailed: false,
  orderHistory: [], // Нужно будет на беке сделать разделение исторических заказов на актуальные и не актуальные, а не разделять все на 2 эндпоинта
  orderHistoryRequest: false,
  orderHistoryFailed: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Добавление блюда в корзину
    addToCart: (state, action: PayloadAction<IBukketDish>) => {
      const { dish_id, variant_id } = action.payload;
      const itemKey = variant_id ? `${dish_id}-${variant_id}` : `${dish_id}`;
      
      // Если такого блюда (с вариантом) еще нет в корзине
      if (!state.dish.some(d => 
        d.dish_id === dish_id && 
        d.variant_id === variant_id
      )) {
        state.dish.push(action.payload);
      }
      
      // Увеличиваем счетчик для этого сочетания
      state.counts[itemKey] = (state.counts[itemKey] || 0) + 1;
    },
    
    // Удаление блюда из корзины
    removeFromCart: (state, action: PayloadAction<{dish_id: number, variant_id?: number}>) => {
      const { dish_id, variant_id } = action.payload;
      const itemKey = variant_id ? `${dish_id}-${variant_id}` : `${dish_id}`;
      
      if (state.counts[itemKey] > 1) {
        state.counts[itemKey] -= 1;
      } else {
        delete state.counts[itemKey];
        state.dish = state.dish.filter(d => 
          !(d.dish_id === dish_id && d.variant_id === variant_id)
        );
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
      })
      .addCase(getUserOrders.pending, (state) => {
        state.orderHistoryRequest = true;
        state.orderHistoryFailed = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action: PayloadAction<IAllOrdersHistory[]>) => {
        state.orderHistoryRequest = false;
        state.orderHistory = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.orderHistoryRequest = false;
        state.orderHistoryFailed = true;
      });
  }
});

export const { addToCart, removeFromCart, clearCart } = orderSlice.actions;
export default orderSlice.reducer;