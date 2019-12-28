import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestService } from '../../../core/test/test.service';

import { CreateTestModalComponent } from '../../../shared/components/create-test-modal/create-test-modal.component';

@Component(
  {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class HomeComponent implements OnInit {

  public isTeacher: boolean;

  constructor(
    private dialog: MatDialog,
    private testService: TestService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.testService.getRole()
      .subscribe((res: any) => {
        console.log(res.role);

        this.isTeacher = res.role === 'teacher';

        this.changeDetector.detectChanges();
      });
  }

  public openCreateTestModal(): void {
    this.dialog.open(CreateTestModalComponent);
  }
}
