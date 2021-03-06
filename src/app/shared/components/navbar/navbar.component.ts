import {Component, Input, OnInit} from '@angular/core';
import {TranslationModel} from '../../models/translation.model';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../core/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() displaySettings: boolean;
  @Input() displayMiddle: boolean;
  @Input() displaySmallLogo: boolean;
  @Input() displayLanguageSelect: boolean;

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

  public chosenLanguage: TranslationModel = this.languages[0];


  constructor(private translateService: TranslateService,
              private authService: AuthService
  ) {
  }


  ngOnInit() {
    this.displaySettings = this.displaySettings !== undefined;
    this.displayMiddle = this.displayMiddle !== undefined;
    this.displaySmallLogo = this.displaySmallLogo !== undefined;
    this.displayLanguageSelect = this.displayLanguageSelect !== undefined;
  }


  public changeLanguage(lang: any): void {
    this.chosenLanguage = lang;
    this.translateService.setDefaultLang(this.chosenLanguage.json);

    window.localStorage.setItem('lang', this.chosenLanguage.json);
  }

  private logout() {
    this.authService.removeTokens();
  }
}
