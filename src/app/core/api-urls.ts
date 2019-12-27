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

  public static getRoleUrl(): string {
    return `${this.apiRoot}auth/get-role/`;
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

  public static getCreateTestUrl(): string {
    return `${this.apiRoot}test-api/tests/`;
  }

  public static getCreateCategoryUrl(): string {
    return `${this.apiRoot}test-api/categories/`;
  }

  public static getSubCreateCategoryUrl(): string {
    return `${this.apiRoot}test-api/sub-categories/`;
  }

  public static getQuestionsUrl(): string {
    return `${this.apiRoot}test-api/questions/`;
  }

  public static getQuestionUpdateUrl(id: string): string {
    return `${this.apiRoot}test-api/questions/${id}/`;
  }

  public static getAnswersUrl(): string {
    return `${this.apiRoot}test-api/answers/`;
  }

  public static getAnswerUpdateUrl(id: string): string {
    return `${this.apiRoot}test-api/answers/${id}/`;
  }

  public static getPermissionUrl(): string {
    return `${this.apiRoot}test-api/allow-test/`;
  }

  public static getStartPassTestUrl(): string {
    return `${this.apiRoot}analytics/solved-tests/`;
  }

  public static getSolvedQuestionsUrl(): string {
    return `${this.apiRoot}analytics/solved-questions/`;
  }

  public static getSolvedAnswersUrl(): string {
    return `${this.apiRoot}analytics/solved-answers/`;
  }

  public static getFinishTestUrl(): string {
    return `${this.apiRoot}analytics/finish-test/`;
  }
}
