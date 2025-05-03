import React, { FC, useState } from "react";
import { IAllOrdersHistory } from "../../../../types/order-types";
import style from './order-history-card.module.css'
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectUserInfo } from "../../../../store/selectors/user/userSelectors";
import { adminGetUsersActualOrders, editStatusOrder, getUserOrders, removeDishFromOrder } from "../../../../store/slices/orderingSlice";
import { Button } from "antd";
import { ITelegramId } from "../../../../types/user-types";

interface IOrderHistoryCard {
    order: IAllOrdersHistory;
}

export const OrderHistoryCard: React.FC<IOrderHistoryCard> = ({ order }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUserInfo);
    const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
    const [isChangingStatus, setIsChangingStatus] = useState(false);

    const getStatusClass = (status: string) => {
        switch(status) {
            case 'formalized': return style.status_processing;
            case 'completed': return style.status_completed;
            case 'canceled': case 'deleted': return style.status_cancelled;
            default: return style.status_pending;
        }
    };

    // Форматирование даты
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const handleEditOrderStatus = async (order_id: number) => { // Делать активным снова заказ я не хочу, ибо заказывать можно не в любое
        // время. А на все это учитывать в работе, которую делаю просто для личного удобства - я не желаю
        if (!confirm('Вы уверены, что хотите отменить этот заказ?')) return;
        if (!user?.telegram_id) return;
        
        setIsChangingStatus(true);
        try {
          await dispatch(editStatusOrder({
            order_id,
            new_status: 'canceled'
          })).unwrap();
          
          dispatch(getUserOrders(user?.telegram_id as ITelegramId));
        } catch (error) {
          console.error('Ошибка при изменении статуса:', error);
        } finally {
          setIsChangingStatus(false);
        }
      };


      const handleRemoveDish = async (dishId: number, dishName: string, variantId?: number) => {
        if (!confirm(`Удалить "${dishName}" из заказа?`) || !user?.telegram_id) return;
      
        try {
          await dispatch(removeDishFromOrder({ //@ts-ignore
            telegram_id: user.telegram_id,
            order_id: order.order_id,
            dish_id: dishId,
            variant_id: variantId
          })).unwrap();
          
          dispatch(getUserOrders(user?.telegram_id as ITelegramId));
        } catch (error) {
          console.error('Ошибка при удалении:', error);
        }
      };
  
    const canEditOrder = ['formalized', 'unknown'].includes(order.status);


    return (
      <div className={style.order_card}>
            <div className={style.order_header}>
                <div>
                    <span className={style.order_number}>Заказ #{order.order_id}</span>
                    <span className={style.order_date}>{formatDate(order.datetime)}</span>
                </div>
                {order.status === 'formalized' && (
                    <Button 
                    danger 
                    onClick={() => handleEditOrderStatus(order.order_id)}
                    loading={isChangingStatus}
                    disabled={isChangingStatus}
                    >
                    {isChangingStatus ? 'Отмена...' : 'Отменить заказ'}
                    </Button>
                )} 
                <span className={`${style.order_status} ${getStatusClass(order.status)}`}>
                    {order.status === 'formalized' && 'Оформлен'}
                    {order.status === 'completed' && 'Завершен'}
                    {order.status === 'canceled' && 'Отменен'}
                    {order.status === 'deleted' && 'Удален'}
                </span>
            </div>

            <div className={style.order_items}>
            {order.items.map(item => {
                const itemKey = item.variant?.id 
                ? `${item.dish_id}-${item.variant.id}` 
                : `${item.dish_id}`;
                const isRemoving = removingItems.has(itemKey);
              
                return (
                    <div 
                    key={`${order.order_id}-${itemKey}-${isRemoving ? 'removing' : 'normal'}`}
                    className={`${style.order_item} ${isRemoving ? style.removing : ''}`}
                >
                    <div className={style.item_info}>
                    <span className={style.order_number}>
                        {item.dish_name}
                        {item.variant ? ` ${item.variant.size}` : null}
                        {item.count > 1 && ` × ${item.count}`}
                    </span>
                    <span>{item.price * item.count} ₽</span>
                    </div>
                    
                    {canEditOrder && (
                    <button 
                        className={style.remove_button}
                        onClick={() => handleRemoveDish(item.dish_id, item.dish_name, item.variant?.id)}
                        disabled={removingItems.has(itemKey)}
                    >
                        {removingItems.has(itemKey) ? 'Удаление...' : '×'}
                    </button>
                    )}
                </div>
                );
            })}
            </div>

            <div className={style.order_total}>
                <span>Итого:</span>
                <span>{order.amount} ₽</span>
            </div>
        </div>
    );
};