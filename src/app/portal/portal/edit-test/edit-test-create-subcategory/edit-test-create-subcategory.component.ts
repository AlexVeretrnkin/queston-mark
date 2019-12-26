import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TestService } from '../../../../core/test/test.service';
import { CategoryModel } from '../../../../shared/models/test/category.model';

@Component(
  {
    selector: 'app-edit-test-create-subcategory',
    templateUrl: './edit-test-create-subcategory.component.html',
    styleUrls: ['./edit-test-create-subcategory.component.scss']
  })
export class EditTestCreateSubcategoryComponent implements OnInit {
  public formGroup: FormGroup;

  public categories$: Observable<CategoryModel[]>;

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public ngOnInit(): void {
    console.log(this.data);

    this.categories$ = this.testService.getCategories();

    this.formGroup = this.formBuilder.group(
      {
        name: [this.data.name, Validators.required],
        category: ['', Validators.required]
      });
  }
}
