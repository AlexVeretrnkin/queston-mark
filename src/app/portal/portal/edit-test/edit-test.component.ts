import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { TestService } from '../../../core/test/test.service';
import { AnswerModel } from '../../../shared/models/test/answer.model';
import { QuestionModel } from '../../../shared/models/test/question.model';
import { SubCategoryModel } from '../../../shared/models/test/sub-category.model';
import { TestStateEnum } from '../../../shared/models/test/test-state.enum';
import { TestModel } from '../../../shared/models/test/test.model';
import { EditTestCreateSubcategoryComponent } from './edit-test-create-subcategory/edit-test-create-subcategory.component';

@Component(
  {
    selector: 'app-create-test',
    templateUrl: './edit-test.component.html',
    styleUrls: ['./edit-test.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class EditTestComponent implements OnInit {

  public testList$: Observable<TestModel[]>;
  public testQuestions$: Observable<QuestionModel[]>;
  public questionAnswers$: Observable<AnswerModel[]>;

  public testStateEnum: typeof TestStateEnum = TestStateEnum;
  public testState: TestStateEnum;

  public subCategories: SubCategoryModel[];

  public createQuestionForm: FormGroup;

  public isQuestionToDelete: boolean = false;

  public activeTest: TestModel;

  public activeAnswers: AnswerModel[];

  private activeQuestion: QuestionModel;

  private isSubcategoryExist: boolean = true;

  constructor(
    private testService: TestService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  public done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  public questionsToEdit: QuestionModel[] = [];

  public ngOnInit(): void {
    this.testState = this.testStateEnum.none;

    this.activeAnswers = [];

    this.testList$ = this.testService.getTests();

    this.activeQuestion = new QuestionModel();

    this.createQuestionForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        text: ['', Validators.required],
        subCategoryName: ['', Validators.required]
      });

    combineLatest([this.testService.getSubcategories(), this.createQuestionForm.get('subCategoryName').valueChanges])
      .pipe(
        tap(([category, input]: [SubCategoryModel[], any]) => {
          this.subCategories = category;

          this.isSubcategoryExist = this.subCategories.some((item: SubCategoryModel) => item.name === input || item === input);
        })
      ).subscribe();
  }

  public drop(event: CdkDragDrop<any>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public editQuestion(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      this.activeQuestion = event.container.data[0];

      console.log(this.activeQuestion);

      this.changeFormsForEdit();

      this.testService.getAnswerForQuestion(this.activeQuestion.id)
        .subscribe((res) => {
          this.activeAnswers = res;

          this.changeState(this.testStateEnum.questionToEdit);
        });
    }
  }

  public changeFormsForEdit(): void {
    this.createQuestionForm.patchValue(
      {
        name: this.activeQuestion.name,
        text: this.activeQuestion.text,
        subCategoryName: this.activeQuestion.category ? this.activeQuestion.category.toString() : ''
      });

    console.log(this.createQuestionForm.get('subCategoryName').value);
  }

  public showControls(): void {
    this.isQuestionToDelete = true;

    this.changeDetectorRef.detectChanges();
  }

  public hideControls(): void {
    this.isQuestionToDelete = false;

    this.changeDetectorRef.detectChanges();
  }

  public getQuestions(test: TestModel): void {
    this.activeTest = test;

    console.log(this.testState);

    this.testQuestions$ = this.testService.getQuestionsByTest(this.activeTest.id);

    this.changeState(this.testStateEnum.none);
  }

  public displayFn(category?: SubCategoryModel): string | null {
    if (typeof category === 'string') {
      return category;
    }

    return category ? category.name : null;
  }

  public createQuestion(): void {
    this.activeQuestion.name = this.createQuestionForm.get('name').value;
    this.activeQuestion.text = this.createQuestionForm.get('text').value;
    this.activeQuestion.category = this.createQuestionForm.get('subCategoryName').value.id;
    this.activeQuestion.test = this.activeTest.id;

    if (this.isSubcategoryExist) {
      this.testService.createNewQuestion(this.activeQuestion)
        .subscribe((result: QuestionModel) => this.activeQuestion.id = result.id);
    } else {

      const modalRef: MatDialogRef<EditTestCreateSubcategoryComponent> =
        this.dialog.open(EditTestCreateSubcategoryComponent, {
          data: {name: this.createQuestionForm.get('subCategoryName').value}
        });

      modalRef.afterClosed()
        .pipe(
          filter((res: SubCategoryModel) => !!res),
          tap(x => console.log(x)),
          switchMap((result: SubCategoryModel) => this.testService.createSubcategory(result)),
          switchMap(() => this.testService.getSubcategories()),
          tap((result: SubCategoryModel[]) => this.subCategories = result)
        )
        .subscribe();
    }
  }

  public createAnswer(answer: AnswerModel): void {
    const newAnswer: AnswerModel = answer;
    newAnswer.question = this.activeQuestion.id;

    console.log(newAnswer);

    this.testService.createAnswerForQuestion(newAnswer).subscribe(x => console.log(x));
  }

  public getQuestionAnswers(question: QuestionModel): void {
    this.activeQuestion = question;

    this.questionAnswers$ = this.testService.getAnswerForQuestion(this.activeQuestion.id)
      .pipe(
        tap(x => console.log(x))
      );
  }

  private changeState(state: TestStateEnum): void {
    this.testState = state;

    this.changeDetectorRef.detectChanges();
  }
}
