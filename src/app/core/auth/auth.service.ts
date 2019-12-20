import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AssistantRegisterModel } from '../../shared/models/assistant-register.model';
import { TeacherRegisterModel } from '../../shared/models/teacher-register.model';

import {UserModel} from '../../shared/models/userModel';
import {Observable} from 'rxjs';
import {ApiUrls} from '../api-urls';
import {TokenResultModel} from '../../shared/models/token-result.model';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public registerTeacher(registerModel: TeacherRegisterModel): Observable<void> {
    return this.httpClient.post<void>(ApiUrls.getRegisterTeacherUrl(), registerModel);
  }

  public registerStudent(registerModel: TeacherRegisterModel | AssistantRegisterModel): Observable<void> {
    return this.httpClient.post<void>(ApiUrls.getRegisterStudentUrl(), registerModel);
  }

  public registerAssistant(registerModel: AssistantRegisterModel | TeacherRegisterModel): Observable<void> {
    return this.httpClient.post<void>(ApiUrls.getRegisterAssistantUrl(), registerModel);
  }

  public login(email: string, password: string): Observable<TokenResultModel> {
    return this.httpClient.post<TokenResultModel>(ApiUrls.getLoginUrl(), {
      email,
      password
    }).pipe(
      tap((token: TokenResultModel) => this.setToken(token))
    );
  }

  public refreshToken(): Observable<string> {
    return this.httpClient.post<string>(ApiUrls.getRefreshTokenUrl(), {
      refresh: this.getRefreshToken()
    }).pipe(
      map((res: any) => res.access),
      tap((res: string) => localStorage.setItem('access', res))
    );
  }

  public check(): Observable<any> {
    return this.httpClient.get(ApiUrls.getCheckUrl());
  }

  public setToken(token: TokenResultModel): void {
    localStorage.setItem('access', token.access);
    localStorage.setItem('refresh', token.refresh);
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh');
  }

  public getAccessToken(): string {
    return localStorage.getItem('access');
  }

  public isAccessTokenExist(): boolean {
    return !!localStorage.getItem('access');
  }

  public removeTokens(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
