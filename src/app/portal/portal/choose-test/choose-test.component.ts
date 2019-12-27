import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.tests$ = this.testService.getTests();
  }

}
