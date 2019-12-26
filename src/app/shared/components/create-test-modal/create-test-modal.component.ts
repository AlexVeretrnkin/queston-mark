import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { TestService } from '../../../core/test/test.service';
import { CategoryModel } from '../../models/test/category.model';
import { TestModel } from '../../models/test/test.model';

@Component(
  {
    selector: 'app-create-test-modal',
    templateUrl: './create-test-modal.component.html',
    styleUrls: ['./create-test-modal.component.scss']
  })
export class CreateTestModalComponent implements OnInit {

  public testForm: FormGroup;

  public testCategories$: Observable<CategoryModel[]>;

  constructor(
    private testService: TestService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.testForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        category: ['', Validators.required],
        information: ['', Validators.required]
      }
    );

    this.testCategories$ =  this.testService.getCategories();
  }

  public displayFn(category?: string): string | null {
    return category ? category : null;
  }

  public createTest(): void {
    let test: TestModel = new TestModel();
    test = this.testForm.getRawValue();

    console.log(test);

    this.testService.createTest(test)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.category[0].match('Object with name')[0]) {
            return this.testService.createCategory(test.category)
              .pipe(switchMap(() => this.testService.createTest(test)));
          }

          return throwError('Error');
        }),
        take(1)
      )
      .subscribe(() => {
        this.snackBar.open('Test created!');

        this.dialog.closeAll();
      });
  }

}
