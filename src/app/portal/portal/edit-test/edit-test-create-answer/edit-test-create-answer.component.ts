import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerModel } from '../../../../shared/models/test/answer.model';

@Component(
  {
    selector: 'app-edit-test-create-answer',
    templateUrl: './edit-test-create-answer.component.html',
    styleUrls: ['./edit-test-create-answer.component.scss']
  })
export class EditTestCreateAnswerComponent implements OnInit {
  @Output() answerCreated: EventEmitter<AnswerModel> = new EventEmitter<AnswerModel>();

  @Input() answer: AnswerModel;
  @Input() order: number;

  public formGroup: FormGroup;

  public questions: string[] = ['question.right', 'question.in-correct'];

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        text: ['', Validators.required],
        right: ['', Validators.required]
      });

    this.formGroup.patchValue(
      {
        text: this.answer.text ? this.answer.text : '',
        right: this.answer.is_right ? this.questions[0] : this.questions[1]
  });

    console.log(this.answer);
    console.log(this.formGroup.getRawValue());
  }

  public create(): void {
    this.answerCreated.emit(this.formGroup.getRawValue());
  }

}
