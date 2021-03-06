import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatCardModule, MatMenuModule} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

import { HomeComponent } from './portal/home/home.component';

import { PortalRoutingModule } from './portal-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PortalComponent } from './portal/portal.component';
import { EditTestComponent } from './portal/edit-test/edit-test.component';
import { EditTestCreateSubcategoryComponent } from './portal/edit-test/edit-test-create-subcategory/edit-test-create-subcategory.component';
import { EditTestCreateAnswerComponent } from './portal/edit-test/edit-test-create-answer/edit-test-create-answer.component';
import { ChooseTestComponent } from './portal/choose-test/choose-test.component';
import { StudentPermissionComponent } from './portal/student-permission/student-permission.component';
import { ProfileComponent } from './portal/profile/profile.component';
import { StudentPermissionEmailComponent } from './portal/student-permission/student-permission-email/student-permission-email.component';
import { PassTestComponent } from './portal/pass-test/pass-test.component';
import { StatsComponent } from './portal/stats/stats.component';

@NgModule(
  {
    declarations: [
      PortalComponent,
      HomeComponent,
      EditTestComponent,
      EditTestCreateSubcategoryComponent,
      EditTestCreateAnswerComponent,
      ChooseTestComponent,
      StudentPermissionComponent,
      ProfileComponent,
      StudentPermissionEmailComponent,
      PassTestComponent,
      NavbarComponent,
      StatsComponent
    ],
    imports: [
      CommonModule,
      PortalRoutingModule,
      MatButtonModule,
      DragDropModule,
      MatGridListModule,
      MatInputModule,
      TranslateModule,
      MatDialogModule,
      MatSnackBarModule,
      MatListModule,
      MatDividerModule,
      MatCardModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      MatSelectModule,
      MatIconModule,
      FormsModule,
      MatCheckboxModule,
      MatMenuModule
    ],
    exports: [
      NavbarComponent,
    ],
    entryComponents: [
      EditTestCreateSubcategoryComponent,
      StudentPermissionEmailComponent
    ]
  })
export class PortalModule {
}
