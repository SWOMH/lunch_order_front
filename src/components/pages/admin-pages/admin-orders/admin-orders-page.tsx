import { useEffect } from 'react';
import { selectAdminActualOrder, selectOrderHistoryError, selectOrderHistoryLoading, selectOrderUserHistory } from '../../../../store/selectors/order/orderSelectors';

import Loader from '../../../ui/Loader';
import { selectUserInfo } from '../../../../store/selectors/user/userSelectors';
import { ITelegramId } from '../../../../types/user-types';
import { AdminOrderCard } from './admin-order-card/admin-order-card';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { adminGetUsersActualOrders, getUserOrders } from '../../../../store/slices/orderingSlice';
import { AdminNullOrdersPage } from './admin-orders-empty';

export const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAdminActualOrder);
  const isLoading = useAppSelector(selectOrderHistoryLoading);
  const errorLoad = useAppSelector(selectOrderHistoryError);
  const user = useAppSelector(selectUserInfo)


  useEffect(() => {    
    dispatch(adminGetUsersActualOrders(user?.telegram_id as ITelegramId))
  }, [dispatch]);
  
  if (isLoading) {
    return <Loader />;
  };
  
  if (errorLoad) {
    return (
      <div className="error-container">
        <h2>Ошибка загрузки заказов</h2>
        <p>Произошла ошибка при загрузке заказов'</p>
      </div>
    );
  };

  if (!orders || !Array.isArray(orders) || orders.length === 0 || orders.every(order => !order.items || order.items.length === 0)) {
    return <AdminNullOrdersPage />;
  }

  return (
    <>
      <div className='header'>Заказы</div>
      <div className='order-list'>
        {orders.map(order => (
          <div className='order-item' key={order.order_id}>
            <AdminOrderCard order={order} />
          </div>
        ))}
      </div>
    </>
  );
}; 