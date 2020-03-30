import { DriverState } from '../shared/enums/driver-state.enum';

export interface Driver {
  id: number | string;
  firstName: string;
  lastName: string;
  state: DriverState;
}

export function createDriver(params: Partial<Driver>) {
  return {

  } as Driver;
}
