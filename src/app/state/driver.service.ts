import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { DriverStore } from './driver.store';
import { Driver } from './driver.model';
import { tap } from 'rxjs/operators';
import { PizzaService } from '../core/services/services/pizza.service';

@Injectable({ providedIn: 'root' })
export class DriverService {

  constructor(private driverStore: DriverStore,
              private pizzaService: PizzaService) {
  }

  get() {
    return this.pizzaService.getDrivers().pipe(tap(entities => {
      this.driverStore.set(entities);
    }));
  }

  add(driver: Driver) {
    this.driverStore.add(driver);
  }

  update(id, driver: Partial<Driver>) {
    this.driverStore.update(id, driver);
  }

  remove(id: ID) {
    this.driverStore.remove(id);
  }
}
