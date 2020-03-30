import { NgModule } from '@angular/core';
import { NavListItemComponent } from './components/nav-list-item.component';
import { MatListModule } from '@angular/material';
import { OrderCountPipe } from './pipes/order-count.pipe';

@NgModule({
  imports: [
    MatListModule
  ],
  declarations: [
    NavListItemComponent,
    OrderCountPipe
  ],
  exports: [
    NavListItemComponent,
    OrderCountPipe
  ]
})
export class SharedModule {
}
