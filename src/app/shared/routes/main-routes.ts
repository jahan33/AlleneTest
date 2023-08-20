import { Routes } from '@angular/router';

export const MainRoutes: Routes = [
  {
    path: 'customer',
    loadChildren: () =>
      import('src/app/customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'vehicle',
    loadChildren: () =>
      import('src/app/vehicle/vehicle.module').then((m) => m.VehicleModule),
  },
  {
    path: 'contract',
    loadChildren: () =>
      import('src/app/contract/contract.module').then((m) => m.ContractModule),
  },
];
