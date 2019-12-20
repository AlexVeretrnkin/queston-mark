import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTestComponent } from './portal/create-test/create-test.component';
import { HomeComponent } from './portal/home/home.component';

import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  {
    path: '', component: PortalComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'create-test', component: CreateTestComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PortalRoutingModule {
}
