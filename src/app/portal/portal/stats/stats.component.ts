import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TestService } from '../../../core/test/test.service';
import { TestModel } from '../../../shared/models/test/test.model';

@Component({
             selector: 'app-stats',
             templateUrl: './stats.component.html',
             styleUrls: ['./stats.component.scss']
           })
export class StatsComponent implements OnInit {

  public tests: TestModel[] = [];

  constructor(
    private router: Router,
    private testService: TestService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    const tempArr: any[] = [];

    this.testService.getTests()
      .pipe(
        tap(x => this.tests = x),
        switchMap(() => this.testService.getTestStats())
      )
      .subscribe((result) => {
        console.log('--', result);

        if (result) {
          result.forEach((item: any) => {
            this.tests.forEach((test) => {
              if (test.id === item.test) {
                tempArr.push(
                  {
                    ...test,
                    mark: item.mark
                  });
              }
            });
          });
        }

        this.tests = tempArr;
        console.log(this.tests);
        console.log(tempArr);

        this.changeDetector.detectChanges();
      });
  }

  public continueTest(item: TestModel) {
    if (!item.is_checked) {
      this.router.navigate([`/portal/pass/${item.id}`]);
    }
  }
}
