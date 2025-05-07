import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserInfo } from './store/slices/authSlice';
import { Loader } from './components/ui/Loader';
import { RegisterPage } from './components/pages/register-pages/register-page';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectUserInfo, selectUserNotFound, selectUserInfoLoading } from './store/selectors/user/userSelectors';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUserInfo); 
  const userNotFound = useAppSelector(selectUserNotFound);
  const isLoading = useAppSelector(selectUserInfoLoading); 

  useEffect(() => { //@ts-ignore
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

  useEffect(() => {
    if (user && !user.ban) {
      navigate('/authorized');
    }
  }, [user, navigate]);

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
  
  return <Outlet />;
}

export default App;
