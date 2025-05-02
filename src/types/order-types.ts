import { IDish } from './dish-types';
import { IApiError } from './other-types';
import { ITelegramId } from './user-types';

interface IUserRequestOrderHistory {
  telegram_id: ITelegramId;
  full_name: string;
}

interface IVariant {
  id: number;
  size: string;
};

interface IOrderItems {
  dish_id: number;
  dish_name: string;
  count: number;
  price: number;
  variant?: IVariant;
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
  adminOrderActual: IAllOrdersHistory[];
  orderHistoryRequest: boolean;
  orderHistoryFailed: boolean;
  editOrderLoading: boolean;
  editOrderError: IApiError | null;
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

export interface IRemoveDishFromOrder {
  telegram_id: number;
  order_id: number;
  dish_id: number;
  variant_id?: number;
}

export interface IEditOrderResponse {
  order_id: number;
  new_amount: number;
  removed: boolean;
}