import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface OrderState extends EntityState<Order> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'order' })
export class OrderStore extends EntityStore<OrderState> {

  constructor() {
    super();
  }

}

