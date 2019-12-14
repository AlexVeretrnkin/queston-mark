import {environment} from '../../environments/environment';

export class ApiUrls {
  private static readonly apiRoot: string = environment.apiUrl;

  public static getRegisterUrl(): string {
    return `${this.apiRoot}auth/register/`;
  }

  public static getLoginUrl(): string {
    return `${this.apiRoot}auth/login/`;
  }

  public static getRefreshTokenUrl(): string {
    return `${this.apiRoot}auth/token/refresh/`;
  }

  public static getCheckUrl(): string {
    return `${this.apiRoot}auth/checkAuth/`;
  }
}
