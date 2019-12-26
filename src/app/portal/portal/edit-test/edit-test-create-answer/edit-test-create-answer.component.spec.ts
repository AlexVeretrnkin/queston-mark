import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestCreateAnswerComponent } from './edit-test-create-answer.component';

describe('EditTestCreateAnswerComponent', () => {
  let component: EditTestCreateAnswerComponent;
  let fixture: ComponentFixture<EditTestCreateAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestCreateAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestCreateAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
