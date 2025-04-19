import React, { useEffect, useRef, useState } from 'react';
import './dishes-page.css';
import { selectAllDishes, selectDishesError, selectDishesLoading, selectGroupedDishes } from '../../../store/selectors/dish/dishSelectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../../ui/Loader';
import { getAllDish } from '../../../store/slices/dishSlice';
import { DishCard } from './dish/dish-card';
import { selectTotalCartPrice } from '../../../store/selectors/order/orderSelectors';
import { Link } from 'react-router-dom';
import { IDish } from '../../../types/dish-types';
import { Button, Divider, Segmented } from 'antd';
import { selectUserIsAdmin } from '../../../store/selectors/user/userSelectors';


export const DishesPage = React.memo(() => {
  const dispatch = useAppDispatch();

  const [selectedType, setSelectedType] = useState<string>('Все');
  const dishes = useAppSelector(selectAllDishes);
  const groupedDishes = useAppSelector(selectGroupedDishes);
  const isLoading = useAppSelector(selectDishesLoading);
  const error = useAppSelector(selectDishesError);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const typeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isLoaded = useAppSelector(state => state.dish.isLoaded);


  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (!isLoaded && !isLoading) {
        try {
          await dispatch(getAllDish()).unwrap();
        } catch (error) {
          console.error('Ошибка загрузки:', error);
        }
      }
    };
  
    if (isMounted) {
      loadData();
    }
  
    return () => {
      isMounted = false;
    };
  }, [dispatch, isLoaded, isLoading]);

  const handleTypeChange = React.useCallback((type: string) => {
    setSelectedType(type);
  }, []);

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

  const allTypes = Array.from(new Set(dishesArray.map(d => d.type)));
  const options = ['Все', ...allTypes];


  return (
    <div className="dishes-page">
      <h1 className="page-title">Меню</h1>
      <div className="dish-categories">
        <Segmented<string>
          options={options}
          onChange={handleTypeChange}
          value={selectedType}
        />
      </div>
        {selectedType === 'Все' ? (
            Object.entries(groupedDishes).map(([type, dishes]) => (
              <div key={type} ref={el => typeRefs.current[type] = el}>
                <Divider orientation="left">{type}</Divider>
                <div className="dishes-grid">
                  {dishes.map(dish => (
                    <div className="dish-grid-item" key={dish.id}>
                      <DishCard dish={dish} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div ref={el => typeRefs.current[selectedType] = el}>
              <Divider orientation="left">{selectedType}</Divider>
              <div className="dishes-grid">
                {groupedDishes[selectedType]?.map(dish => (
                  <div className="dish-grid-item" key={dish.id}>
                    <DishCard dish={dish} />
                  </div>
                ))}
              </div>
            </div>
          )}
      
      {totalCartPrice > 0 && (
        <div className="cart-info">
          <div className="cart-total">{totalCartPrice} ₽</div>
          <Link to='/authorized/cart' className='go-to-cart-btn'>Перейти в корзину</Link>
        </div>
      )}
    </div>
  );
});