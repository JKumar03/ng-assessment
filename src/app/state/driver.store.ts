import { Injectable } from '@angular/core';
import { Driver } from './driver.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface DriverState extends EntityState<Driver> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'driver' })
export class DriverStore extends EntityStore<DriverState> {

  constructor() {
    super();
  }

}

