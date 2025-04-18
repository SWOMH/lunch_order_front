import './null-orders.module.css';

export const NullOrdersPage = () => {
  return (
    <div className="orders-page">
      <h1 className="page-title">Мои заказы</h1>
      
      <div className="orders-empty-state">
        <div className="orders-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="#ccc" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" />
          </svg>
        </div>
        <p className="empty-text">У вас пока нет заказов</p>
        <p className="empty-desc">Здесь будут отображаться ваши заказы</p>
      </div>
    </div>
  );
}; 