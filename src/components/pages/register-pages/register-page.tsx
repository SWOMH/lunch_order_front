import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getUserInfo, registerUser } from '../../../store/slices/authSlice';
import { Loader } from '../../ui/Loader';
import './register-page.css';
import { selectUserInfoError, selectUserInfoLoading } from '../../../store/selectors/user/userSelectors';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectUserInfoLoading);
  const error = useAppSelector(selectUserInfoError);
  
  const [formData, setFormData] = useState({
    full_name: '',
    telegram_id: '',
    telegram_name: '',
    telegram_username: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    full_name: ''
  });
  
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => { //@ts-ignore
    const tg = window.Telegram?.WebApp;
  
    if (tg) {
      const initData = tg.initDataUnsafe || tg.initData;
      const user = initData?.user;
      
      if (user) {
        const firstName = user.first_name || '';
        const lastName = user.last_name || '';
        const fullName = [firstName, lastName].filter(Boolean).join(' ');
        
        setFormData(prev => ({
          ...prev,
          full_name: '',
          telegram_id: user.id.toString(),
          telegram_name: fullName || firstName || '',
          telegram_username: user.username || ''
        }));
      }
    } else{
      console.log('Не, нихуя')
      // setFormData(prev => ({
      //   ...prev,
      //   telegram_id: '3',
      //   full_name: 'Test User',
      //   telegram_name: 'Test',
      //   telegram_username: 'testuser'
      // }));
    }
  }, []);

  const validateForm = () => {
    const errors = {
      full_name: ''
    };
    let isValid = true;
    
    if (!formData.full_name.trim()) {
      errors.full_name = 'Имя обязательно для заполнения';
      isValid = false;
    }
    
    if (!formData.telegram_id) {
      // Не показываем ошибку пользователю, просто логируем
      console.error('Telegram ID не получен');
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotFoundError(false);
    
    if (!validateForm()) {
      return;
    }

    try {
      const userData = {
        telegram_id: parseInt(formData.telegram_id),
        full_name: formData.full_name,
        telegram_name: formData.telegram_name || null,
        telegram_username: formData.telegram_username || null
      };
      
      await dispatch(registerUser(userData)).unwrap();
      // Получаем информацию о пользователе после регистрации
      await dispatch(getUserInfo(formData.telegram_id)).unwrap();
      // Перенаправляем на главную страницу
      navigate('/authorized/dishes');
    } catch (error: any) {
      if (error?.status === 404) {
        setNotFoundError(true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="register-page">
      <div className="register-form">
        <h2 className="form-title">Регистрация</h2>
        
        {notFoundError && (
          <div className="error-message">
            Пользователь не найден. Пожалуйста, проверьте данные и попробуйте снова.
          </div>
        )}
        
        {error && typeof error === 'string' && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="full_name">
              Имя
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              className={`form-input ${formErrors.full_name ? 'error' : ''}`}
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
            />
            {formErrors.full_name && (
              <div className="input-error">{formErrors.full_name}</div>
            )}
          </div>

          <div className="form-group telegram-id-info">
            <label className="form-label">
              Telegram ID
            </label>
            <div className="telegram-id-display">
              {formData.telegram_id ? formData.telegram_id : 'Идет получение Telegram ID...'}
            </div>
            <p className="telegram-id-note">ID получен автоматически из Telegram</p>
          </div>
          <div className="form-group telegram-info">
            <label className="form-label">
              Имя в Telegram
            </label>
            <div className="telegram-info-display">
              {formData.telegram_name || 'Не указано'}
            </div>
          </div>

          <div className="form-group telegram-info">
            <label className="form-label">
              Username
            </label>
            <div className="telegram-info-display">
              {formData.telegram_username || 'Не указано'}
            </div>
          </div>
          {/* <input type="hidden" name="telegram_name" value={formData.telegram_name} />
          <input type="hidden" name="telegram_username" value={formData.telegram_username} /> */}

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading || !formData.telegram_id}
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
};