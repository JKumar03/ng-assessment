import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ToppingStore, ToppingState } from './topping.store';

@Injectable({ providedIn: 'root' })
export class ToppingQuery extends QueryEntity<ToppingState> {

  constructor(protected store: ToppingStore) {
    super(store);
  }

}
