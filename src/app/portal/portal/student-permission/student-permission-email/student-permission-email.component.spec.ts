import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPermissionEmailComponent } from './student-permission-email.component';

describe('StudentPermissionEmailComponent', () => {
  let component: StudentPermissionEmailComponent;
  let fixture: ComponentFixture<StudentPermissionEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPermissionEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPermissionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
