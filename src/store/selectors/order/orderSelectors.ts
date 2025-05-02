import { RootState } from '../../store';
import { IDish } from '../../../types/dish-types';
import { IAllOrdersHistory } from '../../../types/order-types';

// Селектор для получения всех блюд в корзине
export const selectCartDishes = (state: RootState): IDish[] => {
  const allDishes = state.dish.dishes;
  const cartItems = state.order.dish;
  const counts = state.order.counts;

  return cartItems.map(cartItem => {
    const dish = allDishes.find(d => d.id === cartItem.dish_id);
    if (!dish) return undefined;

    const dishCopy: IDish = {
      ...dish,
      variants: dish.variants ? [...dish.variants] : null,
    };
    
    if (cartItem.variant_id) {
      const variant = dish.variants?.find(v => v.id === cartItem.variant_id);
      if (variant) {
        dishCopy.price = variant.price;
        dishCopy.selectedVariant = variant; // Сохраняем выбранный вариант
      }
    }

    return dishCopy;
  }).filter(Boolean) as IDish[];
};

// Селектор для получения количества блюд по ID
export const selectCartCounts = (state: RootState): Record<string, number> => 
  state.order.counts;

// Селектор для получения общего количества блюд в корзине
export const selectTotalCartItems = (state: RootState): number => {
  const counts = state.order.counts;
  return Object.values(counts).reduce((sum, count) => sum + count, 0);
};



// Селектор для получения общей стоимости корзины
export const selectTotalCartPrice = (state: RootState): number => {
  const cartDishes = selectCartDishes(state);
  const counts = state.order.counts;
  
  return cartDishes.reduce((total, dish) => {
    const itemKey = dish.selectedVariant
      ? `${dish.id}-${dish.selectedVariant.id}`
      : `${dish.id}`;
    
    const count = counts[itemKey] || 0;
    const price = dish.selectedVariant?.price || dish.price || 0;
    
    return total + (price * count);
  }, 0);
};

export const selectEditOrderLoading = (state: RootState) => state.order.editOrderLoading;
export const selectEditOrderError = (state: RootState) => state.order.editOrderError;

// Селектор для получения статуса загрузки заказа
export const selectOrderLoading = (state: RootState): boolean => state.order.orderRequest;

// Селектор для получения ошибки заказа
export const selectOrderError = (state: RootState): boolean => state.order.orderFailed; 

// Селектор для получения данных о заказах по определенному человеку
export const selectOrderUserHistory = (state: RootState): IAllOrdersHistory[] => state.order.orderHistory; 

export const selectAdminActualOrder = (state: RootState): IAllOrdersHistory[] => state.order.adminOrderActual; 

export const selectOrderHistoryLoading = (state: RootState): boolean => state.order.orderHistoryRequest;

export const selectOrderHistoryError = (state: RootState): boolean => state.order.orderHistoryFailed;
