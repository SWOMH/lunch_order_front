import React, { useEffect } from 'react';
import './dishes-page.css';
import { selectAllDishes, selectDishesError, selectDishesLoading } from '../../../store/selectors/dish/dishSelectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../../ui/Loader';
import { getAllDish } from '../../../store/slices/dishSlice';
import { DishCard } from '../dish/dish-card';
import { selectTotalCartPrice } from '../../../store/selectors/order/orderSelectors';
import { Link } from 'react-router-dom';
import { IDish } from '../../../types/dish-types';
import { Segmented } from 'antd';

export const DishesPage = () => {
  const dispatch = useAppDispatch();

  const dishes = useAppSelector(selectAllDishes);
  const isLoading = useAppSelector(selectDishesLoading);
  const error = useAppSelector(selectDishesError);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);

  useEffect(() => {
    dispatch(getAllDish());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Ошибка загрузки блюд</h2>
        <p>{typeof error === 'string' ? error : 'Произошла ошибка при загрузке блюд'}</p>
      </div>
    );
  }
  // @ts-ignore
  const dishesArray: IDish[] = dishes?.dishes || dishes || [];

  return (
    <div className="dishes-page">
      <h1 className="page-title">Меню</h1>
      
      <div className="dish-categories">
        <Segmented<string>
        options={['Все', 'Пицца', 'Римская пицца', 'Роллы', 'Yearly']}
        onChange={(value) => {
          console.log(value); // string
        }}
        />
      </div>
      
      <div className="dishes-grid">
        {dishesArray.length > 0 ? (
          dishesArray.map(dish => (
            <div className="dish-grid-item" key={dish.id}>
              <DishCard dish={dish} />
            </div>
          ))
        ) : (
          <div className="no-dishes">
            <p>Блюда не найдены</p>
          </div>
        )}
      </div>
      
      {totalCartPrice > 0 && (
        <div className="cart-info">
          <div className="cart-total">{totalCartPrice} ₽</div>
          <Link to='/authorized/cart' className='go-to-cart-btn'>Перейти в корзину</Link>
        </div>
      )}
    </div>
  );
};