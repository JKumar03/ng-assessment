import { Injectable } from '@angular/core';
import { Topping } from './topping.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface ToppingState extends EntityState<Topping> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'topping' })
export class ToppingStore extends EntityStore<ToppingState> {

  constructor() {
    super();
  }

}

