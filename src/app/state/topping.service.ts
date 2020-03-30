import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { ToppingStore } from './topping.store';
import { Topping } from './topping.model';
import { tap } from 'rxjs/operators';
import { PizzaService } from '../core/services/services/pizza.service';

@Injectable({ providedIn: 'root' })
export class ToppingService {

  constructor(private toppingStore: ToppingStore,
              private pizzaService: PizzaService) {
  }

  get() {
    return this.pizzaService.getToppings().pipe(tap(entities => {
      this.toppingStore.set(entities);
    }));
  }

  add(topping: Topping) {
    this.toppingStore.add(topping);
  }

  update(id, topping: Partial<Topping>) {
    this.toppingStore.update(id, topping);
  }

  remove(id: ID) {
    this.toppingStore.remove(id);
  }
}
