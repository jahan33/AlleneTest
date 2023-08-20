import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContractComponent } from './add-contract/add-contract.component';
import { ContractOverviewComponent } from './contract-overview/contract-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ContractOverviewComponent,
  },
  {
    path: 'add',
    component: AddContractComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
