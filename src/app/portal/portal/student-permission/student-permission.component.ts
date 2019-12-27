import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TestService } from '../../../core/test/test.service';
import { TestModel } from '../../../shared/models/test/test.model';
import { StudentPermissionEmailComponent } from './student-permission-email/student-permission-email.component';

@Component({
  selector: 'app-student-permission',
  templateUrl: './student-permission.component.html',
  styleUrls: ['./student-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentPermissionComponent implements OnInit {

  public testList$: Observable<TestModel[]>;

  public activeTest: TestModel;

  constructor(
    private testService: TestService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.testList$ = this.testService.getTests();
  }

  public createPermission(test: TestModel): void {
    const modalRef: MatDialogRef<StudentPermissionEmailComponent> =
      this.dialog.open(StudentPermissionEmailComponent, {
        data: {name: ''}
      });

    modalRef.afterClosed()
      .pipe(
        switchMap((email: string) => this.testService.createPermission(test.id, email))
      )
      .subscribe(x => console.log(x));
  }
}
