import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../store/slices/authSlice';
import { Loader } from '../../ui/Loader';
import styles from './register.module.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, isRegistered } = useSelector(state => state.auth);
  const [fullName, setFullName] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [telegramName, setTelegramName] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg && tg.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      setTelegramId(user.id?.toString() || '');
      setTelegramName(user.first_name || '');
      
      const firstName = user.first_name || '';
      const lastName = user.last_name || '';
      const fullNameFromTg = [firstName, lastName].filter(Boolean).join(' ');
      
      if (fullNameFromTg) {
        setFullName(fullNameFromTg);
      }
      
      if (user.username) {
        setTelegramUsername(user.username);
      }
    } else {
      setTelegramId('3');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      setFormError('Пожалуйста, введите ваше полное имя');
      return;
    }
    
    if (!telegramId) {
      setFormError('Не удалось получить Telegram ID');
      return;
    }
    
    const userData = {
      telegram_id: parseInt(telegramId),
      full_name: fullName,
      telegram_name: telegramName || null,
      telegram_username: telegramUsername || null
    };
    
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (isRegistered) {
      window.location.reload();
    }
  }, [isRegistered]);

  if (isLoading) {
    return <Loader />;
  }

  return (
      <div className={styles.register_page}>              
        <form onSubmit={handleSubmit} className={styles.register_form}>
          <div className={styles.form_title}>
            <h1>Регистрация</h1>
            <p>Пожалуйста, заполните информацию о себе, чтобы продолжить.</p>
          </div>
          {error && <div className={styles.error_message}>{error?.message}</div>}
          {formError && <div className={styles.error_message}>{formError}</div>}
          <div className={styles.form_group}>
            <input
              className={styles.form_input}
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Введите ваше полное имя"
              required
            />
          </div>
          
          <button className={styles.submit_button} type="submit" disabled={isLoading}>
            Зарегистрироваться
          </button>
        </form>
      </div>
  );
};