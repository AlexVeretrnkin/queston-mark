import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateTestModalComponent } from '../../../shared/components/create-test-modal/create-test-modal.component';

@Component(
  {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
export class HomeComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {}

  public openCreateTestModal(): void {
    this.dialog.open(CreateTestModalComponent);
  }
}
