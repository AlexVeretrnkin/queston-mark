import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth/auth.service';
import {RegisterModel} from '../shared/models/register.model';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  public formLoginGroup: FormGroup;
  public formRegisterGroup: FormGroup;

  public isRegister: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.isRegister = false;

    this.formLoginGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formRegisterGroup = this.formBuilder.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public register(): void {
    let model: RegisterModel = new RegisterModel();
    model = this.formRegisterGroup.getRawValue();

    console.log(model);

    this.isRegister = false;

    this.changeDetectorRef.detectChanges();

    this.authService.register(model)
      .pipe(take(1))
      .subscribe();
  }

  public signUp(): void {
    this.isRegister = true;

    this.changeDetectorRef.detectChanges();
  }

  public login(): void {
    if (!this.isRegister) {
      this.authService.login(this.formLoginGroup.getRawValue().login, this.formLoginGroup.getRawValue().password)
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['/portal']));
    } else {
      this.register();
    }
  }

  public check(): void {
    this.authService.check().subscribe(x => console.log(x));
  }

}
