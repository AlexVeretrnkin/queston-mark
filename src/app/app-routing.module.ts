import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AppComponent} from './app.component';

import {LandingComponent} from './landing/landing.component';
import {AuthGuard} from './core/auth-guard/auth.guard';


const routes: Routes = [
  {path: '', component: AppComponent, children: [
      {path: '', component: LandingComponent},
      {path: 'portal',
        loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule),
        canLoad: [AuthGuard]
      },
      {path: '**', redirectTo: ''}
 ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
