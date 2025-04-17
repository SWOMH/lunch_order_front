import { IDish } from './dish-types';
import { ITelegramId } from './user-types';

interface IUserRequestOrderHistory {
  telegram_id: ITelegramId;
  full_name: string;
}


interface IOrderItems {
  dish_id: number;
  dish_name: string;
  count: number;
  price: number;
}

type OrderStatus = 'formalized' | 'completed' | 'canceled' | 'deleted' | 'unknown';

export interface IAllOrdersHistory {
  order_id: number;
  user: IUserRequestOrderHistory;
  datetime: string;
  amount: number;
  status: OrderStatus;
  items: IOrderItems[];
}

export interface IBukketDish {
  dish_id: number;
  variant_id?: number;
}

export interface IBukket {
  dish: IBukketDish[];
  counts: Record<string, number>;
  orderRequest: boolean;
  orderFailed: boolean;
  orderHistory: IAllOrdersHistory[];
  orderHistoryRequest: boolean;
  orderHistoryFailed: boolean;
}

export interface IOrderInfo {
  id: number;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: IOrderItem[];
}

export interface IOrderItem {
  dish_id: number;
  name: string;
  price: number;
  count: number;
}