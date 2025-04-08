import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dishReducer from './slices/dishSlice'

export const store = configureStore({
  reducer: {
    user: authReducer,
    dish: dishReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store; 