import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { OrderStore } from './order.store';
import { Order } from './order.model';
import { tap } from 'rxjs/operators';
import { PizzaService } from '../core/services/services/pizza.service';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(
    private orderStore: OrderStore,
    private pizzaService: PizzaService
  ) { }

  get() {
    return this.pizzaService.getOrders().pipe(tap(entities => {
      this.orderStore.set(entities);
    }));
  }

  add(order: Order) {
    return this.pizzaService.addNewOrder(order).pipe(tap(entity => {
      this.orderStore.add(entity as Order);
      alert('Order access successfully!');
    }));
  }

  update(id, order: Order) {
    return this.pizzaService.updateOrder(order).pipe(tap(entity => {
      this.orderStore.update(id, entity);
    }));
  }

  remove(id: ID) {
    this.orderStore.remove(id);
  }
}
