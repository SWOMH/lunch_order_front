import { NavLink } from 'react-router-dom';
import './BottomNavMenu.css';

// Иконки для навигации
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L21.16 5.96C21.5 5.33 21.14 4.5 20.41 4.5H5.21L4.27 2.5H1V4.5H3L6.6 11.59L5.25 14.04C4.52 15.37 5.48 17 7 17H19V15H7L7.17 14.75Z" />
  </svg>
);

const OrdersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" />
  </svg>
);

export const BottomNavMenu = () => {
  return (
    <nav className="bottom-nav">
      <NavLink 
        to="/authorized/dishes" 
        className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}
      >
        <MenuIcon />
        <span>Меню</span>
      </NavLink>
      
      <NavLink 
        to="/authorized/cart" 
        className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}
      >
        <CartIcon />
        <span>Корзина</span>
      </NavLink>
      
      <NavLink 
        to="/authorized/orders" 
        className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}
      >
        <OrdersIcon />
        <span>Заказы</span>
      </NavLink>
    </nav>
  );
}; 