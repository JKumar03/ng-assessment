import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { PizzaLogisticsComponent } from './pizza-logistics.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { PizzaSizeModel } from '../../shared/models/pizza-size.model';
import { PizzaSize } from '../../shared/enums/pizza-size.enum';

describe('Pizza Logistics Component', () => {
  let component: PizzaLogisticsComponent;
  let fixture: ComponentFixture<PizzaLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaLogisticsComponent ],
      imports: [
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render container div with four section items', async(() => {
    expect(fixture.debugElement.queryAll(By.css('.container')).length).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('.container-item')).length).toEqual(4);
  }));

  it('Open Orders section: should have title " Open Orders "', async(() => {
    const openOrdersCardTitle = fixture.debugElement.query(By.css('.open-orders')).nativeElement.querySelector('mat-card-title');
    expect(openOrdersCardTitle.textContent).toContain(' Open Orders ');
  }));

  it('The data elements in the DOM match the data coming from the typescript class', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    const pizzaSizes: PizzaSizeModel[] = [
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

    expect(component.pizzaSizes).toEqual(pizzaSizes);
    const matSelect = compiled.querySelector('mat-select[placeholder=Size]'); // Get the size dropdown reference
    if (matSelect) {
      matSelect.children[0].click(); // Click the size dropdown
      fixture.detectChanges();
      const matOptions = fixture.debugElement.queryAll(By.css('.mat-option')); // Get the reference of size options
      expect(matOptions.length).toEqual(component.pizzaSizes.length); // Check the count of options

      matOptions.forEach((option, i) => {
        expect(option.nativeElement.textContent).toContain(pizzaSizes[i].name); // Match each option with pizzaSizes
      });
    }
  }));
});



