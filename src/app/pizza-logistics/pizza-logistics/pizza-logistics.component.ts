import { Component, OnInit } from '@angular/core';
import { PizzaState } from '../../shared/enums/pizza-state.enum';
import { PizzaSize } from '../../shared/enums/pizza-size.enum';
import { TIME_CONFIG } from '../../../assets/config/time.config';


import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaSizeModel } from 'src/app/shared/models/pizza-size.model';

import { OrderService } from '../../state/order.service';
import { OrderQuery } from '../../state/order.query';
import { Order } from '../../state/order.model';

import { DriverService } from '../../state/driver.service';
import { DriverQuery } from '../../state/driver.query';
import { Driver } from '../../state/driver.model';

import { ToppingService } from '../../state/topping.service';
import { ToppingQuery } from '../../state/topping.query';
import { Topping } from '../../state/topping.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizza-logistics',
  templateUrl: './pizza-logistics.component.html',
  styleUrls: ['./pizza-logistics.component.scss']
})
export class PizzaLogisticsComponent implements OnInit {
  loading$: Observable<boolean>;
  orders$: Observable<Order[]>;
  openOrders$: Observable<Order[]>;
  readyOrders$: Observable<Order[]>;
  deliveredOrders$: Observable<Order[]>;
  totalOrdersCount: number;
  drivers$: Observable<Driver[]>;
  toppings$: Observable<Topping[]>;
  driversObj: any = {};
  newOrderForm: FormGroup;
  toppingsFormControl = new FormControl();
  pizzaState = {
    OPEN: PizzaState.open,
    PREPARING: PizzaState.preparing,
    COOKING: PizzaState.cooking,
    READY: PizzaState.ready,
    ENROUTE: PizzaState.enRoute,
    DELIVERED: PizzaState.delivered
  };

  pizzaSizes: PizzaSizeModel[] = [
    {
      name: 'Small',
      value: PizzaSize.small
    },
    {
      name: 'Regular',
      value: PizzaSize.regular
    },
    {
      name: 'medium',
      value: PizzaSize.medium
    },
    {
      name: 'large',
      value: PizzaSize.large
    },
  ];

  constructor(
    private orderService: OrderService,
    private orderQuery: OrderQuery,

    private driverService: DriverService,
    private driverQuery: DriverQuery,

    private toppingService: ToppingService,
    private toppingQuery: ToppingQuery,

    private formBuilder: FormBuilder

  ) { }

  public ngOnInit(): void {
    this.loading$ = this.orderQuery.selectLoading();

    this.orders$ = this.orderQuery.selectAll();
    this.orderQuery.selectCount().subscribe(count => {
      this.totalOrdersCount = count;
    });

    this.openOrders$ = this.orderQuery.selectAll({filterBy: order => order.state === PizzaState.open});
    this.readyOrders$ = this.orderQuery.selectAll({filterBy: order => order.state === PizzaState.ready});
    this.deliveredOrders$ = this.orderQuery.selectAll({filterBy: order => order.state === PizzaState.delivered});
    this.orderService.get().subscribe();

    this.drivers$ = this.driverQuery.selectAll();
    this.driverService.get().subscribe();

    this.toppings$ = this.toppingQuery.selectAll();
    this.toppingService.get().subscribe();

    this.newOrderForm = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z0-9]+$')]],
      size: ['', Validators.required]
    });
  }

  placeOrder() { // create order
    if (this.newOrderForm.valid) {
        const tps = [];
        // Get all the selected toppings id and push it in tps array
        if (this.toppingsFormControl.value) {
          this.toppingsFormControl.value.forEach(item => {
            tps.push({id: item});
          });
        }

        const order: Order = { // Initialize the object data
          id:  this.totalOrdersCount + 1,
          customerName: this.newOrderForm.controls.customerName.value,
          size: this.newOrderForm.controls.size.value,
          toppings: tps,
          state: PizzaState.open,
          driverId: 0
        };
        this.orderService.add(order).subscribe(); // Persist data in the api and store
      }
  }

  sendToKitchen(orderId) { // Pass the order to kitchen for cooking
    this.updateOrder(orderId, this.pizzaState.COOKING, TIME_CONFIG.COOKING_WITHOUT_TOPPING);
  }

  assign(orderId, driverId) { // Pass the order to driver, so that he can deliver to the customer
    this.updateOrder(orderId, this.pizzaState.ENROUTE, TIME_CONFIG.DELIVERY, driverId);
  }

  simulateProcess(orderId, state, afterMs) { // To simulate the process like Cooking, Delivery
      (async () => {
        await this.timeout(afterMs);
        this.updateOrder(orderId, state);
      })();
  }
  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  updateOrder(orderId, state?, afterMs?, driverId?) { // afterMs will refer to cooking or the delivery time
    (async () => {
      let selectedOrder: Order;
      await this.orderQuery.selectEntity(orderId).subscribe(entity => { // find the order by id
        selectedOrder = entity;
      });
      const order = selectedOrder ? {...selectedOrder} : null; // copy selected order if it has

      if (order) {
        if (state) {
          order.state = state; // Set order state
        }
        if (driverId) {
          order.driverId = driverId; // Set driver id
        }
        if (afterMs && !driverId) { // Calculate the total time taken in cooking including the toppings
          let toppingsTime = 0;
          order.toppings.forEach(item => {
            (async () => {
              await this.toppingQuery.selectEntity(item.id).subscribe( entity => {
                if (entity) {
                  toppingsTime += entity.time * 1000; // Add the topping time in second
                }
              });
            })();
          });
          afterMs += toppingsTime;
        }

        this.orderService.update(order.id, order).subscribe(res => { // Persist order in the api and the store
          if (afterMs) { // Set timer to update the order state after the given simulation time (afterMs)
            if (driverId) {
              this.simulateProcess(orderId, this.pizzaState.DELIVERED, afterMs); // simulate the delivery time
            } else {
              this.simulateProcess(orderId, this.pizzaState.READY, afterMs); // simulate the cooking time
            }
          }
        });
      }
    })();
  } // close of updateOrder

  getToppingsIds(toppings: Topping[]) {
    return toppings.map(topping => topping.id);
  }

  // Method to convert given toppings in comma separated strings, so that it can be displayed in the select box
  getToppingsStr(toppings: Topping[]) {
    return toppings.map(topping => topping.name).join(', ');
  }

  getDriverName(entity: Driver) {
    return entity ? `${entity.firstName} ${entity.lastName}` : '';
  }

  getToppingName(entity: Topping) {
    return entity ? entity.name : '';
  }
}
