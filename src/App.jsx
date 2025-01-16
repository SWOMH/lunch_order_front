import './App.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './services/actions/auth';
import { getDishes } from './services/actions/dish';


function App() {
  const dispatch = useDispatch();
  const { dishes } = useSelector(state => state.dish);
  
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    // Инициализация Web App
    tg.ready();
    // Получение данных пользователя
    const user = tg.initDataUnsafe?.user;
    if (user) {      
      dispatch(getUser(user.id));
    }
    dispatch(getDishes());
  }, [dishes, dispatch]);
  

  return (
    <>
      
    </>
  )
}

export default App
