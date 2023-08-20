import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainRoutes } from './shared/routes/main-routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contract',
    pathMatch: 'full',
  },

  {
    path: '',
    component: MainLayoutComponent,
    data: { title: 'full Views' },
    children: MainRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
