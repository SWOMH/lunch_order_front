import { Navigate, RouteObject } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { DishesPage } from '../components/pages/dish-pages/dishes-page';
import { CartPage } from '../components/pages/cart-pages/cart-page';
import { OrdersPage } from '../components/pages/order-pages/orders-page';
import App from '../App';
import { AdminMainMenu } from '../components/pages/admin-pages/admin-main-menu';
import { AdminDishPage } from '../components/pages/admin-pages/admin-dishes/admin-dish';
import { AdminUsersPage } from '../components/pages/admin-pages/admin-users/admin-users';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'authorized',
        element: <AppLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="dishes" replace />
          },
          {
            path: 'dishes',
            element: <DishesPage />
          },
          {
            path: 'cart',
            element: <CartPage />
          },
          {
            path: 'orders',
            element: <OrdersPage />
          }
        ]
      },
      {
        path: 'admin',
        element: <AppLayout />,
        children: [
          {
            path: '',
            element: <AdminMainMenu />
          },
          {
            path: 'dish',
            element: <AdminDishPage />
          },
          {
            path: 'users',
            element: <AdminUsersPage />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]; 