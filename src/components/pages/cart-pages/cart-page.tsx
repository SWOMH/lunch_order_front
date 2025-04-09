import './cart-page.css';

export const CartPage = () => {
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
}; 