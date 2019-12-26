import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { CreateTestModalComponent } from './components/create-test-modal/create-test-modal.component';

@NgModule(
  {
    declarations: [
      CreateTestModalComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,
      TranslateModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatDialogModule
    ],
    entryComponents: [
      CreateTestModalComponent
    ]
  })
export class SharedModule {
}
