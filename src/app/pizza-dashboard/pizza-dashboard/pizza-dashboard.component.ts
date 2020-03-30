import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PizzaState } from '../../shared/enums/pizza-state.enum';
import { NavItem } from '../../shared/models/nav-item.model';
import { OrderQuery } from 'src/app/state/order.query';

@Component({
  selector: 'app-pizza-dashboard',
  templateUrl: './pizza-dashboard.component.html',
  styleUrls: ['./pizza-dashboard.component.scss']
})
export class PizzaDashboardComponent implements OnInit {
  public navItems: NavItem[] = [
    {
      displayName: 'Logistics',
      route: '/logistics',
    },
    {
      displayName: 'Reports',
      route: '/logistics',
    }
  ];

  totalOrderCount$: Observable<number>;
  enRouteCount$: Observable<number>;
  inKitchenCount$: Observable<number>;
  deliveredCount$: Observable<number>;

  constructor(
    private orderQuery: OrderQuery
  ) { }

  public ngOnInit(): void {
    this.totalOrderCount$ = this.orderQuery.selectCount(order => order.state === PizzaState.open);
    this.enRouteCount$ = this.orderQuery.selectCount(order => order.state === PizzaState.enRoute);
    this.inKitchenCount$ = this.orderQuery.selectCount(order => order.state === PizzaState.cooking);
    this.deliveredCount$ = this.orderQuery.selectCount(order => order.state === PizzaState.delivered);
  }
}
