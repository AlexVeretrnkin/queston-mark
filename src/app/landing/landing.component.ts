import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth/auth.service';
import {RegisterModel} from '../shared/models/register.model';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  public formLoginGroup: FormGroup;
  public formRegisterGroup: FormGroup;

  public languages: any = [
    {
      name: 'English',
      json: 'en'
    },
    {
      name: 'Русский',
      json: 'ru'
    }
  ];

  public test: string = 'en';

  public chosenLanguage: {name: string, json: string} = this.languages[0];

  public isRegister: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.translateService.setDefaultLang(this.chosenLanguage.json);

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
      .subscribe(() => this.changeFormToLogin());
  }

  public changeFormToRegister(): void {
    if (this.isRegister) {
      this.register();
    }

    this.isRegister = true;

    this.changeDetectorRef.detectChanges();
  }

  public changeFormToLogin(): void {
    this.isRegister = false;

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
