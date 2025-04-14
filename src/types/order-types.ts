import { IDish } from './dish-types';


export interface IBukketDish {
  dish_id: number;
  variant_id?: number;
}

export interface IBukket {
  dish: IBukketDish[];
  counts: Record<string, number>;
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