import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToCart, removeFromCart } from '../../../store/slices/orderingSlice';
import './dish-card.css';
import { IDish, IVariants } from '../../../types/dish-types';
import { Button, Modal } from 'antd';
import DishDetails from '../dish-detail/dish-detail'


interface DishCardProps {
  dish: IDish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const counts = useAppSelector(state => state.order.counts);

  const totalCount = Object.entries(counts).reduce((sum, [key, value]) => {
    if (key.startsWith(`${dish.id}-`) || key === dish.id.toString()) {
      return sum + value;
    }
    return sum;
  }, 0);
  
  const handleAddToCart = () => {
    dispatch(addToCart({dish_id: dish.id}));
  };
  
  const handleRemoveFromCart = () => {
    // Находим последний добавленный вариант этого блюда
    const lastAddedKey = Object.keys(counts)
      .filter(key => key.startsWith(`${dish.id}-`) || key === dish.id.toString())
      .sort()
      .pop();
    
    if (lastAddedKey) {
      const [dishId, variantId] = lastAddedKey.split('-');
      dispatch(removeFromCart({ 
        dish_id: parseInt(dishId),
        variant_id: variantId ? parseInt(variantId) : undefined
      }));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const variants = dish.variants || [];
  const sortedVariants = [...variants].sort((a, b) => a.price - b.price);
  const price = sortedVariants[0]?.price ?? dish.price;
  
  return (
    <div className={`dish-card ${!dish.available || dish.stop_list ? 'dish-unavailable' : ''}`}>
      {totalCount > 0 && <span className="dish-count">{totalCount}</span>}

      <Modal title="Подробности"
      footer={
        <Button type='primary'
        onClick={handleCancel}>Закрыть</Button>
      }
      open={isModalOpen}>
        <DishDetails dish={dish}></DishDetails>
      </Modal>
      
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
          { !dish.additives 
          ? <div className="dish-price">{price} ₽</div> 
          :  <div className="dish-price">От {price} ₽</div> }
          <div className="dish-actions">
            {totalCount > 0 && (
              <Button 
                onClick={handleRemoveFromCart}
              >
                −
              </Button>
            )}
            { !dish.additives ?
            <Button 
              type='primary'
              onClick={handleAddToCart} 
            >
              +
            </Button> :
            <Button onClick={handleOpenModal}>Подробнее</Button>
            }
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