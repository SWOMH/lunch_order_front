import { useEffect } from 'react';
import './orders-page.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getUserOrders } from '../../../store/slices/orderingSlice';
import { selectOrderHistoryError, selectOrderHistoryLoading, selectOrderUserHistory } from '../../../store/selectors/order/orderSelectors';
import { NullOrdersPage } from './null-orders/null-orders';
import Loader from '../../ui/Loader';
import { OrderHistoryCard } from './order-card/order-history-card';
import { selectUserInfo } from '../../../store/selectors/user/userSelectors';
import { ITelegramId } from '../../../types/user-types';

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrderUserHistory);
  const isLoading = useAppSelector(selectOrderHistoryLoading);
  const errorLoad = useAppSelector(selectOrderHistoryError);
  const user = useAppSelector(selectUserInfo)


  useEffect(() => {    
    dispatch(getUserOrders(user?.telegram_id as ITelegramId)) // Для тестов пока прокину хардкодом
  }, [dispatch]);
  
  if (isLoading) {
    return <Loader />;
  };
  
  if (errorLoad) {
    return (
      <div className="error-container">
        <h2>Ошибка загрузки заказов</h2>
        <p>'Произошла ошибка при загрузке заказов'</p>
      </div>
    );
  };

  if (orders.length === 0) {
    return (
      <NullOrdersPage />
    );
  };

  return (
    <>
      <div className='header'>Заказы</div>
      <div className='order-list'>
        {orders.map(order => (
          <div className='order-item' key={order.order_id}>
            <OrderHistoryCard order={order} />
          </div>
        ))}
      </div>
    </>
  );
}; 