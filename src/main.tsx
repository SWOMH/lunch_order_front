import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store/store';
import { routes } from './routes';
import './index.css';

const initializeTelegramWebApp = () => {
  try {
    // @ts-ignore
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      tg.expand(); // Раскрываем на весь экран
      tg.enableClosingConfirmation(); // Включаем подтверждение закрытия
      tg.ready(); // Говорим Telegram, что приложение готово
      console.log('Telegram WebApp инициализирован', tg.initDataUnsafe);
    }
  } catch (error) {
    console.error('Ошибка инициализации Telegram WebApp:', error);
  }
};

initializeTelegramWebApp();


const router = createBrowserRouter(routes);

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);
