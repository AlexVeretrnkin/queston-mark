import {environment} from '../../environments/environment';

export class ApiUrls {
  private static readonly apiRoot: string = environment.apiUrl;

  public static getUserInfoURL(): string {
    return `${this.apiRoot}Auth/`;
  }
}
