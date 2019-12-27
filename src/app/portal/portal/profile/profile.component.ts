import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileFormGroup: FormGroup;
  public credentialsFormGroup: FormGroup;
  public permissionsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
  ) {


    this.profileFormGroup = this.formBuilder.group({
      firstName: [{
        value: null,
        disabled: true
      }],
      lastName: [{
        value: null,
        disabled: true
      }]
    });

    this.credentialsFormGroup = this.formBuilder.group({
      email: [{
        value: null,
        disabled: true
      }],
    });

    this.permissionsFormGroup = this.formBuilder.group({
      role: [{
        value: null,
        disabled: true
      }],
    });
  }

  ngOnInit() {
  }

}
