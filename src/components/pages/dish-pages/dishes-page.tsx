import React, { useEffect, useRef, useState } from 'react';
import './dishes-page.css';
import { selectAllDishes, selectDishesError, selectDishesLoading } from '../../../store/selectors/dish/dishSelectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../../ui/Loader';
import { getAllDish } from '../../../store/slices/dishSlice';
import { DishCard } from '../dish/dish-card';
import { selectTotalCartPrice } from '../../../store/selectors/order/orderSelectors';
import { Link } from 'react-router-dom';
import { IDish } from '../../../types/dish-types';
import { Divider, Segmented } from 'antd';

const groupDishesByType = (dishes: IDish[]) => {
  const grouped: Record<string, IDish[]> = {};
  
  dishes.forEach(dish => {
    if (!grouped[dish.type]) {
      grouped[dish.type] = [];
    }
    grouped[dish.type].push(dish);
  });
  
  return grouped;
};

export const DishesPage = () => {
  const dispatch = useAppDispatch();

  const [selectedType, setSelectedType] = useState<string>('Все');
  const dishes = useAppSelector(selectAllDishes);
  const isLoading = useAppSelector(selectDishesLoading);
  const error = useAppSelector(selectDishesError);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const typeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    dispatch(getAllDish());
  }, [dispatch]);

  useEffect(() => {
    if (selectedType !== 'Все' && typeRefs.current[selectedType]) {
      typeRefs.current[selectedType]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [selectedType]);

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

  const groupedDishes = groupDishesByType(dishesArray);
  const dishTypes = Object.keys(groupedDishes);  

  const allTypes = Array.from(new Set(dishesArray.map(d => d.type)));
  const options = ['Все', ...allTypes];

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className="dishes-page">
      <h1 className="page-title">Меню</h1>
      
      <div className="dish-categories">
        <Segmented<string>
          options={options}
          onChange={setSelectedType}
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
};