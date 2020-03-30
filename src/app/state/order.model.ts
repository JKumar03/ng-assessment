import { PizzaState } from '../shared/enums/pizza-state.enum';
import { Topping } from './topping.model';

export interface Order {
  id: number | string;
  customerName: string;
  state: PizzaState;
  size: number;
  toppings: Topping[];
  driverId: number;
}

export interface OrderCounts {
  orders: number;
  inKitchen: number;
  enRoute: number;
  delivered: number;
}

export function createOrder(params: Partial<Order>) {
  return {

  } as Order;
}




