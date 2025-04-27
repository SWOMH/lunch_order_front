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
import { Button, Divider, Segmented, AutoComplete, Input } from 'antd';

export const DishesPage = React.memo(() => {
  const dispatch = useAppDispatch();
  const [selectedType, setSelectedType] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const allDishes = useAppSelector(selectAllDishes);
  const groupedDishes = useAppSelector(selectGroupedDishes);
  const isLoading = useAppSelector(selectDishesLoading);
  const error = useAppSelector(selectDishesError);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const typeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isLoaded = useAppSelector(state => state.dish.isLoaded);

  // Фильтрация блюд по поисковому запросу
  const filterDishes = (dishes: IDish[]) => {
    if (!searchQuery.trim()) return dishes;
    return dishes.filter(dish => 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      || (dish.description && dish.description.toLowerCase().includes(searchQuery.toLowerCase())))
  };

  const getFilteredGroupedDishes = () => {
    const result: Record<string, IDish[]> = {};
    
    if (selectedType === 'Все') {
      Object.entries(groupedDishes).forEach(([type, dishes]) => {
        const filtered = filterDishes(dishes);
        if (filtered.length > 0) {
          result[type] = filtered;
        }
      });
    } else {
      const filtered = filterDishes(groupedDishes[selectedType] || []);
      if (filtered.length > 0) {
        result[selectedType] = filtered;
      }
    }
    
    return result;
  };

  const filteredGroupedDishes = getFilteredGroupedDishes();

  const autoCompleteOptions = allDishes
    .map(dish => ({
      value: dish.name,
      label: dish.name,
    }))
    .filter((option, index, self) =>
      index === self.findIndex(o => o.value === option.value)
    );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSelect = (value: string) => {
    setSearchQuery(value);
  };

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

  const allTypes = Array.from(new Set(allDishes.map(d => d.type)));
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


      <div className="search_container">
        <AutoComplete
          options={autoCompleteOptions}
          style={{ width: '100%', maxWidth: '500px' }}
          onSearch={handleSearch}
          onSelect={handleSelect}
          placeholder="Поиск блюда..."
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input.Search 
            size="large" 
            allowClear 
            enterButton 
          />
        </AutoComplete>
      </div>
      {Object.keys(filteredGroupedDishes).length > 0 ? (
        Object.entries(filteredGroupedDishes).map(([type, dishes]) => (
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
        <div className="no_results">
          {searchQuery 
            ? `Блюда по запросу "${searchQuery}" не найдены` 
            : 'Нет доступных блюд в выбранной категории'}
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