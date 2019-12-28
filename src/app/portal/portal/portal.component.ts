import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalComponent implements OnInit {

  constructor(
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    console.log(window.localStorage.getItem('lang'));

    this.translateService.setDefaultLang(window.localStorage.getItem('lang'));
  }
}
