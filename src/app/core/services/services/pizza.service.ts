import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_CONFFIG } from 'src/assets/config/api.config';

import { Order } from '../../../state/order.model';
import { Driver } from '../../../state/driver.model';
import { Topping } from '../../../state/topping.model';


@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  constructor(private httpClient: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(API_CONFFIG.GET_ORDERS);
  }

  public getOrdersByState(state): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${API_CONFFIG.GET_ORDERS}?state=${state}`);
  }

  public getToppings(): Observable<Topping[]> {
    return this.httpClient.get<Topping[]>(API_CONFFIG.GET_TOPPINGS);
  }

  public getDrivers(): Observable<Driver[]> {
    return this.httpClient.get<Driver[]>(API_CONFFIG.GET_DRIVERS);
  }

  public addNewOrder(order: Order) {
    return this.httpClient.post(API_CONFFIG.GET_ORDERS, order);
  }

  public updateOrder(order: Order) {
    return this.httpClient.put(`${API_CONFFIG.GET_ORDERS}/${order.id}`, order);
  }
}
