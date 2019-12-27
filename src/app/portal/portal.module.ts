import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

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
import { MatIconModule} from '@angular/material/icon';

import { PortalComponent } from './portal/portal.component';
import { EditTestComponent } from './portal/edit-test/edit-test.component';
import { EditTestCreateSubcategoryComponent } from './portal/edit-test/edit-test-create-subcategory/edit-test-create-subcategory.component';
import { EditTestCreateAnswerComponent } from './portal/edit-test/edit-test-create-answer/edit-test-create-answer.component';
import { ChooseTestComponent } from './portal/choose-test/choose-test.component';
import { StudentPermissionComponent } from './portal/student-permission/student-permission.component';
import { ProfileComponent } from './portal/profile/profile.component';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';

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
      NavbarComponent
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
      MatIconModule
    ],
    exports: [
      NavbarComponent
    ],
    entryComponents: [EditTestCreateSubcategoryComponent]
  })
export class PortalModule {
}
