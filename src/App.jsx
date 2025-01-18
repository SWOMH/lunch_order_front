import {React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './services/actions/auth';
import { Loader } from './components/ui/Loader';
import { RegisterPage } from './components/pages/RegisterPage';
import { DishesPage } from './components/pages/DishesPage';

function App() {
  const dispatch = useDispatch();
  const { isLoading, user, isUndefined } = useSelector(state => state.auth);

  useEffect(() => {
    const telegramId = '123456'; // Временное значение для теста
    dispatch(loginUser(telegramId));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isUndefined || !user) {
    return <RegisterPage />;
  }

  return <DishesPage />;
}

export default App;
