import { RootState } from '../../store';
import { IDish } from '../../../types/dish-types';
import { createSelector } from '@reduxjs/toolkit';

// Получение всех блюд
export const selectAllDishes = (state: RootState): IDish[] => state.dish.dishes;

export const selectAdminAllDishes = (state: RootState): IDish[] => state.dish.admin_dish;

// Группированные блюда по типу блюда
export const selectGroupedDishes = createSelector(
  selectAllDishes,
  (dishes) => {
    const grouped: Record<string, IDish[]> = {};
    dishes.forEach(dish => {
      if (!grouped[dish.type]) grouped[dish.type] = [];
      grouped[dish.type].push(dish);
    });
    return grouped;
  }
);

// Получение статуса загрузки
export const selectDishesLoading = (state: RootState): boolean => state.dish.isLoading;

// Получение ошибки
export const selectDishesError = (state: RootState): string | { status?: number; message: string } | null => 
  state.dish.error;

// Селектор с фильтрацией по доступности блюда (хз, понадобится или нет)
export const selectAvailableDishes = (state: RootState): IDish[] => 
  state.dish.dishes.filter(dish => dish.available && !dish.stop_list);

// Селектор для блюд определенного типа (тож хз, буду пользоваться или нет)
export const selectDishesByType = (type: string) => (state: RootState): IDish[] =>
  state.dish.dishes.filter(dish => dish.type === type);