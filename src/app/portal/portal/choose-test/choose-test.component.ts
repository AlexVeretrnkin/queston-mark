import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, switchMap } from 'rxjs/operators';

import { TestService } from '../../../core/test/test.service';
import { TestModel } from '../../../shared/models/test/test.model';

@Component({
  selector: 'app-choose-test',
  templateUrl: './choose-test.component.html',
  styleUrls: ['./choose-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseTestComponent implements OnInit {

  public tests$: Observable<TestModel[]>;

  constructor(
    private testService: TestService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.tests$ = this.testService.getTests();
  }

  public startPassingTest(test: TestModel): void {
    this.testService.startPassingTest(test.id)
      .pipe(
        switchMap(() => fromPromise(this.router.navigate([`/portal/pass/${test.id}`]))),
        catchError(() => fromPromise(this.router.navigate([`/portal/pass/${test.id}`])))
      )
      .subscribe();
  }

}
