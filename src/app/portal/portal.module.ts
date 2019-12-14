import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalComponent } from './portal/portal.component';

import {PortalRoutingModule} from './portal-routing.module';

import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MatButtonModule
  ]
})
export class PortalModule { }
