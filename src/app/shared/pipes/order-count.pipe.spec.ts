import { OrderCountPipe } from './order-count.pipe';

describe('OrderCountPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderCountPipe();
    expect(pipe).toBeTruthy();
  });
});
