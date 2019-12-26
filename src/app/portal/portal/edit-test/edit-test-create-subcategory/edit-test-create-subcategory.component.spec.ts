import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestCreateSubcategoryComponent } from './edit-test-create-subcategory.component';

describe('EditTestCreateSubcategoryComponent', () => {
  let component: EditTestCreateSubcategoryComponent;
  let fixture: ComponentFixture<EditTestCreateSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestCreateSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestCreateSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
