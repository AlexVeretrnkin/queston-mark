import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth-guard/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from './token-interceptor/token-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TokenInterceptorService
  ]
})
export class CoreModule {
}
