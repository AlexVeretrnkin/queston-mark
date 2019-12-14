import {Injectable} from '@angular/core';
import {CanLoad, Route, UrlSegment, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAccessTokenExist()) {
      return true;
    } else {
      this.router.navigate(['/']);

      return false;
    }
  }
}
