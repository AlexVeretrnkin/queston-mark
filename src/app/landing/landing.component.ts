import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth/auth.service';
import {RegisterModel} from '../shared/models/register.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public test(): void {
    const model: RegisterModel = new RegisterModel();
    model.email = 'alexvcer@gmail.com';
    model.first_name = 'Test';
    model.last_name = 'Testovich';
    model.password = '1111';

    this.authService.register(model).subscribe();
  }

  public login(): void {
    this.authService.login(this.formGroup.getRawValue().login, this.formGroup.getRawValue().password)
      .subscribe(() => this.router.navigate(['/portal']));
  }

  public check(): void {
    this.authService.check().subscribe(x => console.log(x));
  }

}
