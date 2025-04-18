import React, { FC } from "react";
import { IAllOrdersHistory } from "../../../../types/order-types";
import style from './order-history-card.module.css'

interface IOrderHistoryCard {
    order: IAllOrdersHistory;
}

export const OrderHistoryCard: React.FC<IOrderHistoryCard> = ({ order }) => {

    const getStatusClass = (status: string) => {
        switch(status) {
            case 'formalized':
                return style.status_processing;
            case 'completed':
                return style.status_completed;
            case 'canceled':
            case 'deleted':
                return style.status_cancelled;
            default:
                return style.status_pending;
        }
    };

    // Форматирование даты
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    return (
      <div className={style.order_card}>
            <div className={style.order_header}>
                <div>
                    <span className={style.order_number}>Заказ #{order.order_id}</span>
                    <span className={style.order_date}>{formatDate(order.datetime)}</span>
                </div>
                <span className={`${style.order_status} ${getStatusClass(order.status)}`}>
                    {order.status === 'formalized' && 'Оформлен'}
                    {order.status === 'completed' && 'Завершен'}
                    {order.status === 'canceled' && 'Отменен'}
                    {order.status === 'deleted' && 'Удален'}
                </span>
            </div>

            <div className={style.order_items}>
                {order.items.map(item => (
                    <div key={`${order.order_id}-${item.dish_id}`} className={style.order_item}>
                        <span className={style.order_number}>
                            {item.dish_name}
                            {item.variant ? ` ${item.variant.size}` : null}
                            {item.count > 1 && ` × ${item.count}`}
                        </span>
                        <span>{item.price * item.count} ₽</span>
                    </div>
                ))}
            </div>

            <div className={style.order_total}>
                <span>Итого:</span>
                <span>{order.amount} ₽</span>
            </div>
        </div>
    );
};