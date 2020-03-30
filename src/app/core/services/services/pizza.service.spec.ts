import { TestBed, getTestBed } from '@angular/core/testing';
import { PizzaService } from './pizza.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PizzaState } from '../../../shared/enums/pizza-state.enum';
import { PizzaSize } from 'src/app/shared/enums/pizza-size.enum';
import { API_CONFFIG } from 'src/assets/config/api.config';
import { Order } from '../../../state/order.model';

describe('Pizza Service', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PizzaService]
  }));

  it('Service instance should be created', () => {
    const service: PizzaService = TestBed.get(PizzaService);
    expect(service).toBeTruthy();
  });

  describe('Open Order Functionality', () => {
    let injector: TestBed;
    let service: PizzaService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [PizzaService]
      });
      injector = getTestBed();
      service = injector.get(PizzaService);
      httpMock = injector.get(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('The API should be called with the correct payload', () => {
      const dummyOrders: Order[] = [
        { id: 1, state:  PizzaState.open, customerName: 'Daniel', size: PizzaSize.regular, driverId: 0, toppings: [{id: 1}, {id: 2}]},
        { id: 2, state:  PizzaState.ready, customerName: 'Albert', size: PizzaSize.medium, driverId: 0, toppings: [{id: 3}, {id: 5}]},
        { id: 3, state:  PizzaState.open, customerName: 'John', size: PizzaSize.medium, driverId: 0, toppings: [{id: 4}, {id: 5}]}
      ];
      service.getOrdersByState(PizzaState.open).subscribe(orders => {
        expect(orders.length).toBe(2);
        expect(orders).toContain(dummyOrders[0]);
        expect(orders).toContain(dummyOrders[2]);
        expect(orders).not.toContain(dummyOrders[1]);
      });
      const req = httpMock.expectOne(`${API_CONFFIG.GET_ORDERS}?state=${PizzaState.open}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyOrders.filter(item => item.state === PizzaState.open));
    });
  });
});

