import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart, removeFromCart } from '../../store/slices/orderingSlice';
import './DishCard.css';
import { IDish } from '../../types/dish-types';

interface DishCardProps {
  dish: IDish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(state => state.order.counts[dish.id] || 0);
  
  const handleAddToCart = () => {
    dispatch(addToCart(dish));
  };
  
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(dish.id));
  };
  
  // Выбираем первую (основную) цену варианта блюда (Ну эт пока что. Потом нужно будет переделать)
  const price = dish.variants && dish.variants.length > 0 ? dish.variants[0].price : 0;
  
  return (
    <div className={`dish-card ${!dish.available || dish.stop_list ? 'dish-unavailable' : ''}`}>
      {count > 0 && <span className="dish-count">{count}</span>}
      
      <div className="dish-image-container">
        <img 
          src={dish.image || 'https://www.krestianin.ru/sites/default/files/title_image/2015-02/157.jpg'} 
          alt={dish.name} 
          className="dish-image" 
        />
      </div>
      
      <div className="dish-content">
        <h3 className="dish-name">{dish.name}</h3>
        <p className="dish-description">{dish.description}</p>
        
        <div className="dish-footer">
          <div className="dish-price">{price} ₽</div>
          
          <div className="dish-actions">
            {count > 0 && (
              <button 
                className="dish-action-btn remove-btn" 
                onClick={handleRemoveFromCart}
              >
                −
              </button>
            )}
            
            <button 
              className="dish-action-btn add-btn" 
              onClick={handleAddToCart} 
              disabled={!dish.available || dish.stop_list}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      {(!dish.available || dish.stop_list) && (
        <div className="dish-unavailable-overlay">
          <span>Недоступно</span>
        </div>
      )}
    </div>
  );
}; 