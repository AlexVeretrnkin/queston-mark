import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { from, of } from 'rxjs';
import { concatMap, flatMap, mergeMap, switchMap, tap } from 'rxjs/operators';

import { TestService } from '../../../core/test/test.service';
import { AnswerQuestionModel } from '../../../shared/models/test/answer-question.model';
import { AnswerModel } from '../../../shared/models/test/answer.model';
import { QuestionModel } from '../../../shared/models/test/question.model';

@Component(
  {
    selector: 'app-pass-test',
    templateUrl: './pass-test.component.html',
    styleUrls: ['./pass-test.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class PassTestComponent implements OnInit {
  public answersQuestions: AnswerQuestionModel[];
  public questions: QuestionModel[];
  public answers: AnswerModel[];

  private testId: number;

  private chosenTest: number;

  private tempQuestion: QuestionModel[];

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.answersQuestions = [];

    this.testService.getPassingTest()
      .subscribe((res) => {
        console.log(res);

        this.testId = res[res.length - 1].id;
      });

    this.route.paramMap
      .pipe(
        tap((params: ParamMap) => this.chosenTest = parseInt(params.get('id'), 10))
      )
      .subscribe();

    this.testService.getQuestionsByTest(this.chosenTest)
      .pipe(
        tap((question: QuestionModel[]) => this.tempQuestion = question),
        flatMap((item: QuestionModel[]) => item),
        tap((question: QuestionModel) => console.log(question)),
        concatMap((question: QuestionModel) => this.testService.getAnswerForQuestion(question.id)),
        tap(x => console.log(x)),
        tap((answers: AnswerModel[]) => {
          if (answers[0]) {
            const answQuest: AnswerQuestionModel = new AnswerQuestionModel();
            answQuest.question = null;
            answQuest.answers = answers;

            this.answersQuestions.push(answQuest);
          }
        })
      )
      .subscribe(() => {
        this.answersQuestions.forEach((item, i) => {
          item.question = this.tempQuestion[i];
        });

        this.changeDetectorRef.detectChanges();
      });
  }

  public answerQuestion(answer: AnswerModel[]): void {
    const newAnswer: AnswerModel[] = answer.filter(item => item.userAnswer);

    this.testService.solveQuestion(this.testId, answer[0].question)
      .pipe(
        switchMap((data: any) => {
          newAnswer.forEach(item => {
            item.question = data.id;
          });

          return from(newAnswer);
        }),
        mergeMap((result: AnswerModel) => this.testService.solveAnswer(result.question, result.id))
      )
      .subscribe(() => {
        this.answersQuestions = this.answersQuestions.filter((item) => item.answers[0] !== answer[0]);

        this.changeDetectorRef.detectChanges();
      });
  }

  public finish(): void {
    this.testService.finishTest(this.testId)
      .subscribe(() => this.router.navigate(['/portal']));
  }
}
