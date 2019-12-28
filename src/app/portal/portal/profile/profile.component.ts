import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

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

    console.log('Test');

    this.http.get(environment.apiUrl + 'auth/get_user_info/').subscribe((result: any) => {
      console.log(result);
      this.profileFormGroup.patchValue({
        firstName: result.first_name,
        lastName: result.last_name,
      });

      this.credentialsFormGroup.patchValue({
        email: result.email
      });
    });

    this.http.get(environment.apiUrl + 'auth/get-role/').subscribe((result: any) => {
      this.permissionsFormGroup.patchValue({
        role: result.role,
      });
    });

  }

  ngOnInit() {
  }

}
