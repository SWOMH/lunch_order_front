import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToCart, clearCart, removeFromCart } from '../../../store/slices/orderingSlice';
import { selectCartCounts, selectCartDishes, selectTotalCartPrice } from '../../../store/selectors/order/orderSelectors';
import './cart-page.css';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartDishes = useAppSelector(selectCartDishes);
  const cartCounts = useAppSelector(selectCartCounts);
  const totalPrice = useAppSelector(selectTotalCartPrice);
  
  const handleAddDish = (dishId: number) => {
    const dish = cartDishes.find(d => d.id === dishId);
    if (dish) {
      dispatch(addToCart(dish));
    }
  };
  
  const handleRemoveDish = (dishId: number) => {
    dispatch(removeFromCart(dishId));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  const handleCheckout = () => {
    alert('Заказ оформлен!');
  };
  
  if (cartDishes.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="page-title">Корзина</h1>
        
        <div className="cart-empty-state">
          <div className="cart-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="#ccc" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L21.16 5.96C21.5 5.33 21.14 4.5 20.41 4.5H5.21L4.27 2.5H1V4.5H3L6.6 11.59L5.25 14.04C4.52 15.37 5.48 17 7 17H19V15H7L7.17 14.75Z" />
            </svg>
          </div>
          <p className="empty-text">Ваша корзина пуста</p>
          <p className="empty-desc">Добавьте блюда из меню, чтобы сделать заказ</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <h1 className="page-title">Корзина</h1>
      
      <div className="cart-list">
        {cartDishes.map(dish => {
          const count = cartCounts[dish.id] || 0;
          const price = dish.variants && dish.variants.length > 0 ? dish.variants[0].price : 0;
          
          return (
            <div key={dish.id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={dish.image || 'https://via.placeholder.com/80?text=Нет+фото'} 
                  alt={dish.name} 
                />
              </div>
              
              <div className="cart-item-content">
                <h3 className="cart-item-name">{dish.name}</h3>
                <p className="cart-item-price">{price} ₽</p>
              </div>
              
              <div className="cart-item-actions">
                <button 
                  className="cart-action-btn remove-btn" 
                  onClick={() => handleRemoveDish(dish.id)}
                >
                  −
                </button>
                
                <span className="cart-item-count">{count}</span>
                
                <button 
                  className="cart-action-btn add-btn" 
                  onClick={() => handleAddDish(dish.id)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="cart-footer">
        <div className="cart-footer-actions">
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Очистить корзину
          </button>
        </div>
        
        <div className="cart-total">
          <div className="cart-total-label">Итого:</div>
          <div className="cart-total-value">{totalPrice} ₽</div>
        </div>
        
        <button className="checkout-button" onClick={handleCheckout}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
}; 