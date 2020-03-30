import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OrderStore, OrderState } from './order.store';

@Injectable({ providedIn: 'root' })
export class OrderQuery extends QueryEntity<OrderState> {

  constructor(protected store: OrderStore) {
    super(store);
  }

}
