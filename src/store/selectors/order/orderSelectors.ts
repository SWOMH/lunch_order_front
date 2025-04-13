import { RootState } from '../../store';
import { IDish } from '../../../types/dish-types';

// Селектор для получения всех блюд в корзине
export const selectCartDishes = (state: RootState): IDish[] => state.order.dish;

// Селектор для получения количества блюд по ID
export const selectCartCounts = (state: RootState): Record<number, number> => state.order.counts;

// Селектор для получения общего количества блюд в корзине
export const selectTotalCartItems = (state: RootState): number => {
  const counts = state.order.counts;
  return Object.values(counts).reduce((sum, count) => sum + count, 0);
};

// Селектор для получения общей стоимости корзины
export const selectTotalCartPrice = (state: RootState): number => {
  const dishes = state.order.dish;
  const counts = state.order.counts;
  
  return dishes.reduce((total, dish) => {
    const count = counts[dish.id] || 0;
    const price = dish.variants && dish.variants.length > 0 ? dish.variants[0].price : dish.price ? dish.price : 0;
    return total + (price * count);
  }, 0);
};

// Селектор для получения статуса загрузки заказа
export const selectOrderLoading = (state: RootState): boolean => state.order.orderRequest;

// Селектор для получения ошибки заказа
export const selectOrderError = (state: RootState): boolean => state.order.orderFailed; 