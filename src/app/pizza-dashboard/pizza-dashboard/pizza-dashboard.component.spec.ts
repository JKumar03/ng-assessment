import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PizzaDashboardComponent } from './pizza-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { MatDividerModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Pizza Dashboard Component', () => {
  let component: PizzaDashboardComponent;
  let fixture: ComponentFixture<PizzaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaDashboardComponent ],
      imports: [
        SharedModule,
        MatDividerModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
