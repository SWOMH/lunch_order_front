import { IDish } from './dish-types';

export interface IBukket {
  dish: IDish[];
  counts: Record<number, number>;
  orderRequest: boolean;
  orderFailed: boolean;
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