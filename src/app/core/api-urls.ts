import {environment} from '../../environments/environment';

export class ApiUrls {
  private static readonly apiRoot: string = environment.apiUrl;

  public static getRegisterTeacherUrl(): string {
    return `${this.apiRoot}auth/teachers/`;
  }

  public static getRegisterStudentUrl(): string {
    return `${this.apiRoot}auth/students/`;
  }

  public static getRegisterAssistantUrl(): string {
    return `${this.apiRoot}auth/assistants/`;
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
