import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DriverStore, DriverState } from './driver.store';

@Injectable({ providedIn: 'root' })
export class DriverQuery extends QueryEntity<DriverState> {

  constructor(protected store: DriverStore) {
    super(store);
  }

}
