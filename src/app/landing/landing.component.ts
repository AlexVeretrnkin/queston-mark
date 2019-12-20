import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { AuthService } from '../core/auth/auth.service';
import { AssistantRegisterModel } from '../shared/models/assistant-register.model';
import { RoleEnum } from '../shared/models/role.enum';
import { RoleModel } from '../shared/models/role.model';
import { TeacherRegisterModel } from '../shared/models/teacher-register.model';

import { TranslationModel } from '../shared/models/translation.model';
import { UserModel } from '../shared/models/userModel';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  public formLoginGroup: FormGroup;
  public formRegisterGroup: FormGroup;

  public rolesEnum: typeof RoleEnum = RoleEnum;

  public languages: TranslationModel[] = [
    {
      name: 'English',
      json: 'en',
      image: '/assets/flags/eng.png'
    },
    {
      name: 'Русский',
      json: 'ru',
      image: '/assets/flags/ru.png'
    }
  ];

  public roles: RoleModel[] = [
    {
      id: RoleEnum.teacher,
      name: 'landing.role.teacher'
    },
    {
      id: RoleEnum.student,
      name: 'landing.role.student'
    },
    {
      id: RoleEnum.assistant,
      name: 'landing.role.assistant'
    }
  ];

  public chosenLanguage: TranslationModel = this.languages[0];

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
      password: ['', Validators.required],
      role: ['', Validators.required],
      teacher: ['']
    });

    this.formRegisterGroup.get('role').valueChanges.subscribe((value: number) => {
      if (value === this.rolesEnum.assistant) {
        this.formRegisterGroup.get('teacher').setValidators(Validators.required);
      } else {
        this.formRegisterGroup.get('teacher').clearValidators();
        this.formRegisterGroup.get('teacher').patchValue('');
      }
    });
  }

  public register(): void {
    let model: TeacherRegisterModel | AssistantRegisterModel;

    if (this.formRegisterGroup.get('teacher').value === '') {
      model = new TeacherRegisterModel(new UserModel(this.formRegisterGroup.getRawValue()));
    } else {
      model = this.formRegisterGroup.getRawValue();
    }

    console.log(model);

    this.isRegister = false;

    this.changeDetectorRef.detectChanges();

    switch (true) {
      case this.formRegisterGroup.get('role').value === this.rolesEnum.teacher:
        this.authService.registerTeacher(model)
          .pipe(take(1))
          .subscribe(() => this.changeFormToLogin());
        break;
      case this.formRegisterGroup.get('role').value === this.rolesEnum.student:
        this.authService.registerStudent(model)
          .pipe(take(1))
          .subscribe(() => this.changeFormToLogin());
        break;
      default:
        this.authService.registerAssistant(model)
          .pipe(take(1))
          .subscribe(() => this.changeFormToLogin());
    }
  }

  public changeFormToRegister(): void {
    if (this.isRegister) {
      this.register();
    }

    this.isRegister = true;

    this.formRegisterGroup.updateValueAndValidity();

    this.changeDetectorRef.detectChanges();
  }

  public changeLanguage(lang: any): void {
    this.chosenLanguage = lang;

    this.translateService.setDefaultLang(this.chosenLanguage.json);
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
