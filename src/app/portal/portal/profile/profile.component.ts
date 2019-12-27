import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileFormGroup: FormGroup;
  public credentialsFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder,
  ) {
    this.profileFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.credentialsFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
