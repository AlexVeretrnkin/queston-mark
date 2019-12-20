import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './portal/home/home.component';

import {PortalRoutingModule} from './portal-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';

import { PortalComponent } from './portal/portal.component';
import { CreateTestComponent } from './portal/create-test/create-test.component';

@NgModule({
  declarations: [
    PortalComponent,
    HomeComponent,
    CreateTestComponent
  ],
            imports: [
              CommonModule,
              PortalRoutingModule,
              MatButtonModule,
              DragDropModule,
              MatGridListModule,
              MatInputModule,
              TranslateModule
            ]
          })
export class PortalModule { }
