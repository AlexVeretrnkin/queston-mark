import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {BehaviorSubject, Observable, throwError} from 'rxjs';

import {AuthService} from '../auth/auth.service';

import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('start intercept');
    if (this.authService.isAccessTokenExist()) {
      req = this.addToken(req, this.authService.getAccessToken());
    }

    return next.handle(req)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            console.log('401 handling');
            return this.handle401Error(req, next);
          } else {
            return throwError(error);
          }
        })
      );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: string) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => {
          if (token != null) {
            return true;
          } else {
            this.authService.removeTokens();
            this.router.navigate(['/']);

            return false;
          }
        }),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
