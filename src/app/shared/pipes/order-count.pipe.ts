import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderCount'
})
export class OrderCountPipe implements PipeTransform {

  transform(count: number): string {
    if (count) {
      if (count < 10) {
        return `000${count}`;
      } else if (count < 100) {
        return `00${count}`;
      } else if (count < 1000) {
        return `0${count}`;
      } else {
        return count.toString();
      }
    } else {
      return '0000';
    }
  }

}
