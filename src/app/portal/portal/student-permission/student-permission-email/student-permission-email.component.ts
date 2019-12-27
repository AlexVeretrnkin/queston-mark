import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-permission-email',
  templateUrl: './student-permission-email.component.html',
  styleUrls: ['./student-permission-email.component.scss']
})
export class StudentPermissionEmailComponent implements OnInit {

  public email: string;

  constructor() { }

  public ngOnInit(): void {
  }

}
