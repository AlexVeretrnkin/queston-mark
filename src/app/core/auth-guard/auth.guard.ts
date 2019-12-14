import { Injectable } from '@angular/core';
import {CanLoad, Route, UrlSegment, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    this.router.navigate(['/']);

    return false;
  }
}
