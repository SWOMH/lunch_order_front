import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './store/slices/authSlice';
import { Loader } from './components/ui/Loader';
import { RegisterPage } from './components/pages/register-pages/register-page';
import { DishesPage } from './components/pages/dish-pages/dishes-page';

function App() {
  const dispatch = useDispatch();
  const { isLoading, user, userNotFound } = useSelector(state => state.auth);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      const telegramId = tg.initDataUnsafe?.user?.id;
      
      if (telegramId) {
        dispatch(getUserInfo(telegramId));
      }
    } else {
      // Для тестирования без Telegram WebApp
      const testTelegramId = '3';
      dispatch(getUserInfo(testTelegramId));
    }
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (userNotFound || !user) {
    return <RegisterPage />;
  }

  if (user.ban) {
    return (
      <div className="banned-message">
        <h2>Доступ ограничен</h2>
        <p>К сожалению, ваш аккаунт был заблокирован администратором.</p>
        <p>Пожалуйста, свяжитесь с поддержкой для выяснения деталей.</p>
      </div>
    );
  }

  return <DishesPage />;
}

export default App;
