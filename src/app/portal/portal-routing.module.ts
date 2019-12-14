import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PortalComponent} from './portal/portal.component';


const routes: Routes = [
  {path: '', component: PortalComponent, children: [
      {path: '**', redirectTo: ''}
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
